module.exports = function(gulp, runSequence, config) {
  'use strict';

var util = require('util');
var browserSync = require('browser-sync');
//var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === config.SRC || (util.isArray(baseDir) && baseDir.indexOf(config.SRC) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: config.proxyTasks,
      routes: routes
    },
    browser: browser
  });
}

gulp.task('serve', function () {
  browserSyncInit([
    '.tmp/serve',
    config.SRC
  ], [
    '.tmp/serve/{app,components}/**/*.css',
    config.SRC + '/{app,components}/**/*.js',
    config.SRC + 'src/assets/images/**/*',
    '.tmp/serve/*.html',
    '.tmp/serve/{app,components}/**/*.html',
    config.SRC + '/{app,components}/**/*.html'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(config.DIST);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([config.TMP + '/serve', config.SRC], null, []);
});

gulp.task('serve:e2e-dist', function () {
  browserSyncInit(config.DIST, config.DIST, []);
});

};
