/**
 * orchestrator.js links tasks in sequence
 */
module.exports = function(gulp) {
  'use strict';

  var pkg = require('../package.json');
  var del = require('del');
  var dollar = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files'],
    camelize: true,
    lazy: true
  });
  var SRC = 'src/';
  var BUILD = 'build/';
  var NOT_BUILD = '!build/';
  var NOT_SRC = '!src/';

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
    BOWER_COMPONENTS:'bower_components/**/*.{eot,svg,ttf,woff}',
    BOWER_MIN:['bower_components/**/*.min.js*'],
    BOWER_RAW:['bower_components/**/*.js', '!bower_components/**/*.min.js', '!bower_components/**/src/**/*'],
    IMAGE_SRC:SRC + '/assets/images/**/*',
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
    JS_SRC:[SRC + 'app/index.js', SRC + '**/*.js', NOT_SRC + 'lib/**/*'],
    JS_LIB:[BUILD + 'lib/**/*.js'],
    JS_HINT:['gulpfile.js', 'gulp/*.js', SRC + '**/*.js', NOT_SRC + 'lib/**/*.js'],
    JS_TEST_SRC: [
      'bower_components/jq*/**/*.min.js',
      'bower_components/angular/**/*.min.js',
      'bower_components/angular-ui-router/**/*.min.js',
      'bower_components/angular-animate/**/*.min.js',
      'bower_components/angular-cookies/**/*.min.js',
      'bower_components/angular-foundation/**/*.min.js',
      'bower_components/angular-sanitize/**/*.min.js',
      'bower_components/angular-touch/**/*.min.js',
      'bower_components/fastclick/**/*.min.js',
      'bower_components/jquery.cookie/**/*.min.js',
      'bower_components/jquery-placeholder/**/*.min.js',
      'bower_components/modernizr/**/*.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/lib/sinon/sinon-1.12.0.js',
      'src/**/*.js',
      'src/**/*.html'
    ],
    JS_TESTS: [
      'src/**/*.spec.js'
    ]
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
  var proxyTasks = require('./proxy');
  var injectTasks = require('./inject');
  var stylesTasks = require('./styles');

// setup runSequence
  var runSequence = require('run-sequence').use(gulp);

//initialize script paths
  buildTasks(gulp, runSequence, config);
  bowerTasks(gulp, runSequence, config);
  cleanupTasks(gulp, runSequence, config);
  stylesTasks(gulp, runSequence, config);
  watchTasks(gulp, runSequence, config);
  unitTestTasks(gulp, runSequence, config);
  e2eTestTasks(gulp, runSequence, config);
  proxyTasks(gulp, runSequence, config);
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

};
