/**
 * revision.js adds the hash to files and then changes the html references to match
 *
 * THIS IS NOT IDEAL:
 *   - This job tries to ignore multiple calls to launch the revision task. There are other rev/cache busting plugins, no time to look at them all
 *   - Need to figure out the reverse race condition. Gulp is setup to wait for upstream tasks to finish, this is the case where one task could be kicked off by multiple tasks.
 *   - gulp-batch is used to try and prevent the batch from running for every single change
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  // https://www.npmjs.com/package/gulp-rev-all
  // need to build everything in build, then use this to copy to TARGET
  // gulp-batch (in the watcher) prevents 'revision' from running amok with every small change in the BUILD directory
  // still not perfect, seems to run revision twice, even for simple changes

  // this requires changes to rules.xml to allow /login.*.html, /logout.*.html, etc
  gulp.task('revision', function () {
    return gulp.src(config.BUILD + '**/*')
      .pipe(config.$.revAll({ ignore: ['favicon.ico', 'index.html', '.scss'] })).pipe(config.$.debug({verbose: true}))
      .pipe(gulp.dest(config.TARGET))
      .pipe(config.$.size());
   //   .pipe(config.$.revAll.versionFile({ fileName: 'version.json' }))
     // .pipe(gulp.dest(config.TARGET));
  });


  // couldn't get this to work inline with the html-page task
  // with something like: .pipe(config.$.if(!config.rawFlag, config.$.minifyHtml(opts)))
  // but always seems to prevent 'revision' from parsing scripts properly
  gulp.task('minify-html', function () {
    // if "raw" then simply return
    if (config.rawFlag) {
      // is there a simpler return pipe I can use? Adding the callback arg and returning that "works" but the watch task doesn't start
      return gulp.src(config.TARGET + '/index.html')
        .pipe(config.$.size());
    } else {
      // minify
      var opts = {empty:true, conditionals:true, cdata:true, spare:true, quotes:true, comments:true};
      return gulp.src(config.TARGET + '/**/*.html')
        .pipe(config.$.minifyHtml(opts))
        .pipe(gulp.dest(config.TARGET))
        .pipe(config.$.size());
    }
  });
};
