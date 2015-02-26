module.exports = function(gulp, runSequence, config) {
  'use strict';
  // Copy Fonts Section
  gulp.task('fonts-bower', function () {
    return gulp.src(config.BOWER_COMPONENTS)
      .pipe(config.$.flatten())
      .pipe(gulp.dest(config.TARGET + 'fonts'))
      .pipe(config.$.size());
  });
  // Copy FONTS Section
  gulp.task('fonts', ['fonts-bower'], function () {
    return gulp.src(config.TYPE_FACES)
      .pipe(gulp.dest(config.BUILD + 'typefaces'))
      .pipe(config.$.size());
  });

  // Compile SASS Section
  gulp.task('styles-sass', function() {
    var filterCSS = config.$.filter('**/*.css');
    return gulp.src(config.SASS_SRC)
      .pipe(config.$.rubySass({ style: 'expanded', 'sourcemap=none': true }))
      // Filters only css files before auto prefixing
      .pipe(filterCSS)
      .pipe(config.$.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
      .pipe(filterCSS.restore())
      .pipe(config.$.minifyCss({keepBreaks:true}))
      .pipe(gulp.dest(config.BUILD + 'css'))
      .pipe(config.$.size());
  });

  // Copy CSS Section
  gulp.task('styles-app',  function () {
    return gulp.src(config.CSS_SRC)
      .pipe(config.$.minifyCss({keepBreaks:true}))
      .pipe(gulp.dest(config.BUILD + 'css'))
      .pipe(config.$.size());
  });

};
