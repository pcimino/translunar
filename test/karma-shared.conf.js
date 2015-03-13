'use strict';
/* Mostly from the angular.js project */

/* browserList is an array of browsers to test, currently available:
 - Chrome
 - ChromeCanary
 - Firefox
 - Opera
 - Safari (only Mac)
 - PhantomJS
 - IE (only Windows)
 */

module.exports = function(config, specificOptions, browserList) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath : '../',
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
    // list of files / patterns to exclude
    exclude: [
        'bower_components/angular-ui/**/*.spec.js'
    ],

    logColors: true,
    browsers: browserList,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    autoWatch: false, // using grunt to watch and rerun

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // JS unit testing coverage
    preprocessors : {
       'src/**/*.js': ['coverage', 'sourcemap'],
       'src/**/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
        stripPrefix: 'src/',
        // the name of the Angular module to create
        moduleName: 'application.templates'
    },
    plugins:[
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-ng-html2js-preprocessor'
    ],
    reporters : ['dots', 'progress', 'coverage'],

    coverageReporter: {
      reporters:[
        {type: 'html', dir: 'tmp/coverage/'},
        {type: 'cobertura', dir: 'tmp/cobertura/', file: 'cobertura.xml'},
        {type: 'text'},
        {type : 'lcovonly', dir : 'tmp/lcov/', file : 'lcov.info'}
      ]
    },
      loggers: [{type: 'console'}]
  });
};
