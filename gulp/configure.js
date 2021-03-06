/**
 * orchestrator.js links tasks in sequence
 */
module.exports = function(gulp, runSequence) {
  'use strict';

  var pkg = require('../package.json');
  var del = require('del');
  var dollar = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files'],
    camelize: true,
    lazy: true
  });
  var SRC = 'src/';
  var JASMINE = SRC; // if set to /test/jasmine or another directory then used in the watch-test
  var NOT_SRC = '!src/';
  var BUILD = 'build/';
  var NOT_BUILD = '!build/';
  var specExt = '.spec';
  var BOWER = 'bower_components/';
  var NOT_BOWER = '!bower_components/';

  var config = {
    $:dollar,
    del:del,
    pkg:pkg,
    appTargetMin:pkg.name + '.app.min.js',
    appTarget:pkg.name + '.app.js',
    vendorTargetMin:pkg.name + '.lib.min.js',
    vendorTarget:pkg.name + '.lib.js',
    HTML_SRC:SRC + '**/*.html',
    SRC: SRC,
    TMP:'tmp',
    COVERAGE:'coverage',
    NOT_SRC:NOT_SRC,
    NOT_BUILD:NOT_BUILD,
    BUILD:BUILD,
    DIST: 'dist',
    E2E: 'test/e2e',
    rawFlag:false, // default to minify
    watchFlag:false, // default to run once
    BOWER_COMPONENTS:BOWER + '**/*.{eot,svg,ttf,woff}',
    BOWER_MIN:[
      BOWER + '**/*.min.js*',
      NOT_BOWER + '**/*mock*.js',
      NOT_BOWER + 'foundation/js/foundation/*',
      NOT_BOWER + 'foundation/js/vendor/*',
      NOT_BOWER + 'modernizr/{feature-detects,media,test}/*',
      NOT_BOWER + 'jquery/src/***/*',
      NOT_BOWER + '**/*.gzip'
    ],
    BOWER_RAW:[
      BOWER + '**/*.js',
      NOT_BOWER + '**/*.min.js',
      NOT_BOWER + '**/*mock*.js',
      NOT_BOWER + 'foundation/js/foundation/*',
      NOT_BOWER + 'foundation/js/vendor/*',
      NOT_BOWER + 'modernizr/{feature-detects,media,test}/*',
      NOT_BOWER + 'jquery/src/***/*',
      NOT_BOWER + '**/*.gzip'
    ],
    IMAGE_SRC:SRC + '/assets/**/*',
    CSS_SRC:[SRC + '/**/*', '!' + SRC + '/scss/**/*'],
    SASS_SRC:SRC + '/scss/**/*',
    TYPE_FACES: SRC + '/typefaces/**/*',
    TARGET:'dist/',
    karmaTestFiles:[],
    karmaConfig:'test/karma.conf.js',
    protractorConfig:'test/protractor-conf.js',
    banner: [' <%= pkg.name %> - <%= pkg.description %>',
      ' @version v<%= pkg.version %>',
      ' @copyright <%= pkg.licenses.copyright %>',
      ' @url <%= pkg.licenses.url %>'],
    JS_SRC:[SRC + 'app/index.js', SRC + '**/*.js', NOT_SRC + 'lib/**/*', NOT_SRC + '**/*' + specExt + '.js'],
    JS_LIB:[
      BUILD + 'lib/**/angular.*.js',
      '!' + BUILD + 'lib/**/angular-mocks*.js',
      BUILD + 'lib/**/angular-aria*.js',
      BUILD + 'lib/**/angular-cookies*.js',
      BUILD + 'lib/**/angular-sanitize*.js',
      BUILD + 'lib/**/angular-ui-router*.js',
      BUILD + 'lib/**/jquery*.js',
      BUILD + 'lib/**/modernizr*.js',
      BUILD + 'lib/**/sizzle*.js',
      BUILD + 'lib/**/foundation*.js',
      BUILD + 'lib/**/angular*.js',
      BUILD + 'lib/**/*.js'
    ],
    JS_HINT:['gulpfile.js', 'gulp/*.js', SRC + '**/*.js', NOT_SRC + 'lib/**/*.js'],
    JS_TEST_SRC: [
      BOWER + 'jq*/**/*.min.js',
      BOWER + 'angular/**/*.min.js',
      BOWER + 'angular-ui-router/**/*.min.js',
      BOWER + 'angular-animate/**/*.min.js',
      BOWER + 'angular-aria/**/*.min.js',
      BOWER + 'angular-cookies/**/*.min.js',
      BOWER + 'angular-foundation/**/*.min.js',
      BOWER + 'angular-sanitize/**/*.min.js',
      BOWER + 'angular-touch/**/*.min.js',
      BOWER + 'fastclick/**/*.min.js',
      BOWER + 'jquery.cookie/**/*.min.js',
      BOWER + 'jquery-placeholder/**/*.min.js',
      BOWER + 'modernizr/**/*.min.js',
      BOWER + 'angular-mocks/angular-mocks.js',
      'test/lib/sinon/sinon-1.12.0.js',
      'src/**/*.js',
      'src/**/*.html'
    ],
    JS_TESTS: [
      'src/**/*' + specExt + '.js',
      'src/**/*.js'
    ],
    specExt:specExt,
    JASMINE:JASMINE
  };

// load script files
  var buildTasks = require('./build');
  var bowerTasks = require('./build-bower');
  var cleanupTasks = require('./cleanup');
  var revisionTasks = require('./revision');
  var watchTasks = require('./watch');
  var unitTestTasks = require('./unit-tests');
  var e2eTestTasks = require('./e2e-tests');
  var serverTasks = require('./server');
  var injectTasks = require('./inject');
  var stylesTasks = require('./styles');


//initialize script paths
  buildTasks(gulp, runSequence, config);
  bowerTasks(gulp, runSequence, config);
  cleanupTasks(gulp, runSequence, config);
  stylesTasks(gulp, runSequence, config);
  watchTasks(gulp, runSequence, config);
  unitTestTasks(gulp, runSequence, config);
  e2eTestTasks(gulp, runSequence, config);
  injectTasks(gulp, runSequence, config);
  serverTasks(gulp, runSequence, config);
  revisionTasks(gulp, runSequence, config);


  config.handleError = function(err) {
    /* jshint ignore:start */
    this.emit('end');
    /* jshint ignore:end */
    var error = err.toString();
    console.log(error);
  };

  return config;

};
