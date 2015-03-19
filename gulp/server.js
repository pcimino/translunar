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
      browser: browser,
      watchOptions: {
        debounceDelay: 4000
      }
    });
  }
//http://www.shakyshane.com/javascript/nodejs/browser-sync/2014/08/24/browser-sync-plus-grunt/
  gulp.task('serve', function () {
    browserSyncInit('./' + config.DIST, './' + config.DIST + '/**/*', ['chrome']);
  });
};
