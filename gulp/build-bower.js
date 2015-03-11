/**
 * Builds the bower libraries and puts then in <app name>.lib.<min>.js
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  gulp.task('copy-bower', function () {
    // copy both .js and .js.map files
    var fileList = config.BOWER_MIN;
    if (config.rawFlag) {
      fileList = config.BOWER_RAW;
    }
    console.log(fileList);
    return gulp.src(fileList)
      .pipe(config.$.flatten())
      .pipe(gulp.dest(config.TMP + '/lib'))
      .pipe(config.$.size());
  });

  gulp.task('move-bower-maps', ['copy-bower'], function () {
    return gulp.src(config.TMP + '/lib/*.map')
      .pipe(gulp.dest(config.BUILD))
      .pipe(config.$.size());
  });

  // JS concat, strip debugging and (if !config.rawFla) uglify and gminify
  gulp.task('build-bower', ['move-bower-maps'], function() {
    // order matters
    // 1: JQuery
    // 2: angular.js or angular.min.js, only one of these should be int he tmp/ dir based ond the copy-bower step
    var JS_LIB = [
      'tmp/lib/jquery*.js', 'tmp/lib/angular.js', 'tmp/lib/angular.min.js', 'tmp/lib/angular*.js',
      'tmp/lib/foundation*.js', 'tmp/lib/mm*tpls*.js'
    ];

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

};
