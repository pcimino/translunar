exports.config = {

  'allScriptsTimeout' : 60000,
  'getPageTimeout'    : 10000,

  'specs': [
    'e2e/**/*.js'
  ],

  'baseUrl': 'http://localhost:8000/app/',

  'framework': 'jasmine',

  'jasmineNodeOpts': {
    'defaultTimeoutInterval': 60000
  }
};
