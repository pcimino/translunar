module.exports = function(gulp, runSequence, config) {
  'use strict';
// https://www.npmjs.com/package/grunt-protractor-webdriver
var browserSync = require('browser-sync');

// Downloads the selenium webdriver



  // Downloads the selenium webdriver
  /* jshint ignore:start */
  gulp.task('webdriver-update', config.$.protractor.webdriver_update);
  gulp.task('webdriver-standalone', config.$.protractor.webdriver_standalone);
  /* jshint ignore:end */

  gulp.task('protractor-only', ['webdriver-update'], function (done) {
    var testFiles = [
      config.$.E2E + '/**/*.js'
    ];

    gulp.src(testFiles)
      .pipe(config.$.protractor.protractor({
        configFile: config.protractorConfig
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', function () {
        // Close browser sync server
        config.$.browserSync.exit();
        done();
      });
  });

function runProtractor (done) {

  gulp.src(config.E2E + '/**/*.js')
    .pipe(config.$.protractor.protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
      done();
    });
}

gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e', 'webdriver-update'], runProtractor);
gulp.task('protractor:dist', ['serve:e2e-dist', 'webdriver-update'], runProtractor);

};
