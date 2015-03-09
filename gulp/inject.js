module.exports = function(gulp, runSequence, config) {
  'use strict';

  var wiredep = require('wiredep').stream;

  gulp.task('inject', ['styles-sass'], function () {

    var injectStyles = gulp.src([
      config.TMP + '/serve/{app,components}/**/*.css',
      '!' + config.TMP + '/serve/app/vendor.css'
    ], { read: false });

    var injectScripts = gulp.src([
      config.SRC + '/{app,components}/**/*.js',
      '!' + config.SRC + '/{app,components}/**/*.spec.js',
      '!' + config.SRC + '/{app,components}/**/*.mock.js'
    ]).pipe(config.$.angularFilesort());

    var injectOptions = {
      ignorePath: [config.SRC, config.TMP + '/serve'],
      addRootSlash: false
    };

    var wiredepOptions = {
      directory: 'bower_components',
      exclude: [/foundation\.js/, /foundation\.css/, /bootstrap\.css/, /foundation\.css/]
    };

    return gulp.src(config.SRC + '/*.html')
      .pipe(config.$.inject(injectStyles, injectOptions))
      .pipe(config.$.inject(injectScripts, injectOptions))
      .pipe(wiredep(wiredepOptions))
      .pipe(gulp.dest(config.TMP + '/serve'));

  });

};
