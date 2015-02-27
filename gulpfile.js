'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');
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
    'bower_components/**/*.min.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'test/lib/sinon/sinon-1.12.0.js',
    'src/**/*.js',
    'src/**/*.html'
  ],
  JS_TESTS: [
    'test/jasmine/**/*.spec.js'
  ]
};

config.handleError = function(err) {
  /* jshint ignore:start */
  this.emit('end');
  /* jshint ignore:end */
  var error = err.toString();
  console.log(error);
};

// load script files
var orchestratorTasks = require('./gulp/orchestrator');
var buildTasks = require('./gulp/build');
var bowerTasks = require('./gulp/build-bower');
var cleanupTasks = require('./gulp/cleanup');
var revisionTasks = require('./gulp/revision');
var watchTasks = require('./gulp/watch');
var unitTestTasks = require('./gulp/unit-tests');
var e2eTestTasks = require('./gulp/e2e-tests');
var serverTasks = require('./gulp/server');
var proxyTasks = require('./gulp/proxy');
var injectTasks = require('./gulp/inject');
var stylesTasks = require('./gulp/styles');

// setup runSequence
var runSequence = require('run-sequence').use(gulp);

//initialize script paths
orchestratorTasks(gulp, runSequence, config);
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

gulp.task('default', ['clean'], function () {
    gulp.start('build');
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
