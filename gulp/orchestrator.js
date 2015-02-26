/**
 * orchestrator.js links tasks in sequence
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  // Watch
  gulp.task('build', function(callback) {
    if (config.watchFlag) {
      runSequence('build-core', 'scripts-sequence', 'revision', 'minify-html', 'watch-app', callback);
    } else {
      runSequence('build-core', 'scripts-sequence', 'revision', 'minify-html',  callback);
    }
  });

  // Build core
  gulp.task('build-core', function(callback) {
    runSequence('clean', ['image-min', 'copy-bower', 'styles-sass', 'styles-app', 'fonts', 'copy-ico'],
      callback);
  });

};
