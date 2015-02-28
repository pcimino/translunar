/**
 * build.js contains all the assembly tasks, these are fairly straight forward. Most of the tasks are
 * independent. The exceptions are the script-seq/script-seq-raw are responsible for running the
 * test, jshint and concatentation of the JavaScript files
 *
 * To see how the files tie the tasks together (almost in sequence, some non-linear dependencies)
 * - build.js
 *     - orchestrator.js
 *         - watch.js
 *         - build.js
 *             - cleanup.js
 *             - revision.js
 *             - unit-tests.js
 *
 * TBD: e2e-tests.js
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  //var htmlBanner = '<!--' + config.banner.join('\n') + '\n-->\n\n';
  var htmlBanner ='';
  var jsBanner = '/**\n* ' + config.banner.join('\n* ') + '\n*/\n\n';

  /* jshint ignore:start */
  function handleError(err) {
    this.emit('end');
    var error = err.toString();
    console.log(error);
  }
  /* jshint ignore:end */

  // dummy minify: Just copies the images, currently does NOT optimize them, see below
  gulp.task('image-min', function () {
    return gulp.src(config.IMAGE_SRC)
      .pipe(config.$.changed(config.IMAGE_SRC))
      .pipe(gulp.dest(config.BUILD + 'assets'))
      .pipe(config.$.size());
  });

  /* Nice to have, but not critical since this site doesn't have tons of big images
   * For some reason these plugins fail silently (only need one or the other)
   * To try them out, need to install the plugins first:
   > npm install --save-dev gulp-image-optimization gulp-imagemin
   * probably take a while to install since the job may have to compile binaries,
   * might be the issue if the binaries aren't building on the Linux box properly
   *
   gulp.task('image-min-broken-on-linux', function () {
   return gulp.src(config.IMAGE_SRC)
   .pipe(config.$.cache(config.$.imagemin({
   optimizationLevel: 3,
   progressive: true,
   interlaced: false
   })))
   .pipe(gulp.dest(config.BUILD + 'images')).on('error', handleError)
   .pipe(config.$.size());
   });

   gulp.task('image-min-also-broken-on-linux', function () {
   return gulp.src(config.IMAGE_SRC)
   .pipe(config.$.cache(config.$.imageOptimization({
   optimizationLevel: 3,
   progressive: true,
   interlaced: true
   })))
   .pipe(gulp.dest(config.BUILD + 'images')).on('error', handleError)
   .pipe(config.$.size());
   });

   */

  // Build HTML
  gulp.task('html-page', function() {
    config.rawFlag=true;
    var assets = config.$.useref.assets();
    var sources = gulp.src(config.JS_SRC, {read: false});
    return gulp.src(config.HTML_SRC)
      .pipe(config.$.changed(config.HTML_SRC))
      .pipe(config.$.if(config.rawFlag, config.$.replace(/\.min\.js*/ig, '.js')))
      .pipe(config.$.inject(sources))
      .pipe(config.$.replace('@@BUILD_TIME_STAMP@@', config.pkg.name + ' - v' + config.pkg.version + ' - ' + new Date()))
      .pipe(config.$.header(htmlBanner, { pkg : config.pkg } ))
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(config.$.useref())
      .pipe(gulp.dest(config.BUILD))
      .pipe(config.$.size());
  });

  // JS Hint
  gulp.task('jshint', function() {
    return gulp.src(config.JS_HINT)
      .pipe(config.$.jshint())
      .pipe(config.$.jshint.reporter('jshint-stylish'))
      .pipe(config.$.jshint.reporter('fail'))
      .pipe(config.$.size());
  });


  // JS concat, strip debugging and (if !config.rawFla) uglify and gminify
  gulp.task('process-scripts', function() {
    return gulp.src(config.JS_SRC)
      .pipe(config.$.if(config.rawFlag, config.$.concat(config.appTarget, {newLine: ';'})))
      .pipe(config.$.if(!config.rawFlag, config.$.concat(config.appTargetMin, {newLine: ';'})))
      .pipe(config.$.if(!config.rawFlag, config.$.stripDebug()))
      .pipe(config.$.ngAnnotate({
        // true helps add where @ngInject is not used. It infers.
        // Doesn't work with resolve, so we must be explicit there
        add: true
      }))
      .pipe(config.$.if(!config.rawFlag, config.$.uglify({mangle:false})))
      .pipe(config.$.header(jsBanner, { pkg : config.pkg } ))
      .pipe(gulp.dest(config.BUILD))
      .pipe(config.$.size());
  });

  gulp.task('scripts-sequence', function(callback) {
    runSequence(['test', 'jshint', 'process-scripts'], callback);
  });

  gulp.task('copy-ico', function () {
    return gulp.src(config.SRC + '**/*.ico')
      .pipe(gulp.dest(config.TARGET))
      .pipe(config.$.size());
  });

};
