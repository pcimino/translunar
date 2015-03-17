module.exports = function(gulp, runSequence, config) {
  'use strict';

  var util = require('util');
  var browserSync = require('browser-sync');

  function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === config.SRC || (util.isArray(baseDir) && baseDir.indexOf(config.SRC) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    browserSync.instance = browserSync.init(files, {
      startPath: '/',
      server: {
        baseDir: baseDir,
        routes: routes
      },
      browser: browser
    });
  }

  gulp.task('serve', function () {
    browserSyncInit('./' + config.DIST, './' + config.DIST + '/**/*', ['chrome']);
  });
};
