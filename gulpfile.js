'use strict';


var gulp = require('gulp');
// setup runSequence
var runSequence = require('run-sequence').use(gulp);

// load configuration
var configure = require('./gulp/configure');
var config = configure(gulp, runSequence);

// Watch
gulp.task('build', function(callback) {
  if (config.watchFlag) {
    runSequence('build-core', 'revision', 'minify-html', ['watch-app', 'watch-test', 'serve'], callback);
  } else {
    runSequence('build-core', 'revision', 'minify-html', callback);
  }
});

// Build core
gulp.task('build-core', function(callback) {
  runSequence('clean', ['image-min', 'styles-sass', 'fonts', 'copy-ico', 'html-page', 'build-bower', 'scripts-sequence'],
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

gulp.task('help', function() {
  console.log('default');
  console.log('build');
  console.log('build-raw');
  console.log('build-watch');
  console.log('build-watch-raw');
});
