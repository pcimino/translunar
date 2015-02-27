var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  sharedConfig(config, {testName: config.pkg.name + ': build tests', logFile: 'karma-docs.log'}, ['Chrome', 'Firefox']);

  config.set({

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });

};
