'use strict';


var gulp = require('gulp');

// load configuration
var configure = require('./gulp/configure');
configure(gulp);

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
  runSequence('clean', ['image-min', 'styles-sass', 'styles-app', 'fonts', 'copy-ico', 'html-page'],
    callback);
});

// Tasks called are in revision.js
gulp.task('default', function(callback) {
  config.rawFlag = false;
  config.watchFlag = false;
  runSequence('build', callback);
});

gulp.task('build-watch', function(callback) {
  config.rawFlag = false;
  config.watchFlag = true;
  runSequence('build', callback);
});
gulp.task('build-watch-raw', function(callback) {
  config.rawFlag = true;
  config.watchFlag = true;
  runSequence('build', callback);
});
gulp.task('build-raw', function(callback) {
  config.rawFlag = true;
  config.watchFlag = false;
  runSequence('build', callback);
});


gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
