/**
 * Builds the bower libraries and puts then in <app name>.lib.<min>.js
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  // JS concat, strip debugging and (if !config.rawFla) uglify and gminify
  gulp.task('process-bower-scripts', function() {
//var BUILD = 'tmp/';
 //   var NOT_BUILD = '!tmp/';
    var JS_LIB=[
      'tmp/lib/jquery-*.js', 'tmp/lib/angular.js', 'tmp/lib/angular*.js', 'tmp/lib/foundation*.js', 'tmp/lib/mm*tpls*.js'
    ];
    config.rawFlag=true;
    return gulp.src(JS_LIB)
      .pipe(config.$.if(config.rawFlag, config.$.concat(config.vendorTarget, {newLine: ';'})))
      .pipe(config.$.if(!config.rawFlag, config.$.concat(config.vendorTargetMin, {newLine: ';'})))
      .pipe(config.$.if(!config.rawFlag, config.$.stripDebug()))
      .pipe(config.$.ngAnnotate({
        // true helps add where @ngInject is not used. It infers.
        // Doesn't work with resolve, so we must be explicit there
        add: true
      }))
      .pipe(gulp.dest(config.BUILD))
      .pipe(config.$.size());
  });

  gulp.task('copy-bower', function () {
    config.rawFlag=true;
    // copy both .js and .js.map files
    var fileList = config.BOWER_MIN;
    if (config.rawFlag) {
      fileList = config.BOWER_RAW;
    }
    return gulp.src(fileList)
      .pipe(config.$.flatten())
      .pipe(gulp.dest(config.TMP + '/lib'))
      .pipe(config.$.size());
  });

  gulp.task('move-bower-maps', function () {
    return gulp.src(config.BUILD + '/lib/*.map')
      .pipe(gulp.dest(config.BUILD))
      .pipe(config.$.size());
  });

  // Build core
  gulp.task('build-bower', function(callback) {
    runSequence(['move-bower-maps', 'copy-bower'], 'process-bower-scripts',
      callback);
  });

};
