/**
 * watch.js is responsible for watching for changed files and rerunning the appropriate build step
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  var fs = require('fs');
  var mainBowerFiles = config.$.mainBowerFiles;

  // dummy callBack prevents emit error on too many callBacks
  var callBackHandler = function() {
  };

  gulp.task('watch-app', function() {
    // icon changes
    gulp.watch(config.SRC + '**/*.ico', ['copy-ico']);

    // images changes
    gulp.watch(config.SRC + 'images/**/*', ['copy-images']);

    // html changes
    gulp.watch([config.HTML_SRC], ['html-page']);

    // JavaScript changes
    gulp.watch([config.JS_SRC], ['scripts-sequence']);

    // watch for test changes
    var fileList = [];
    fileList = fileList.concat(config.JS_TESTS);
    gulp.watch(fileList, function(changed) {
      addChangedFileToTestList(changed);
      console.log(JSON.stringify(changed, null, 2));
      runSequence('test', 'jshint', callBackHandler);
    });

    // watch for Image changes, fonts and styles
    gulp.watch([config.IMAGE_SRC, config.CSS_SRC, config.SASS_SRC, config.TYPE_FACES], ['image-min' , 'styles', 'styles-sass', 'fonts']);

    // watch for changes in the library directory
    gulp.watch(config.SRC + 'lib/*.js', ['copy-libraries']);

    /**
     * These rebuild right into the target, so no need to run revision
     */
      // bower changes, bower fonts, icons
    gulp.watch([mainBowerFiles(), config.BOWER_COMPONENTS, config.SRC + '**/*.ico'], ['copy-bower', 'fonts-bower', 'copy-ico']);

    // watch for changes in the build directory
    gulp.watch(config.BUILD + '**/*', config.$.batch({timeout:8000}, function(events, callBackHandler) {
      runSequence('revision', callBackHandler);
    }));
  });

  gulp.task('watch-test', function() {

    // watch for test changes
    var fileList = [];
    fileList = fileList.concat(config.JS_TESTS);
    gulp.watch(fileList, function(changed) {
      addChangedFileToTestList(changed);
      console.log(JSON.stringify(changed, null, 2));
      runSequence('test', callBackHandler);
    });


  });

  /**
   * Helper method makes sure only tests run for changed files or matching Specs
   *
   * This will only work if this filename convention is used:
   *     - [somefilename].js
   *     - [somefilename]Spec.js
   * Where somefilename is identical in value/case between the source and the test file
   *
   * Also for this to work, the file and the associated spec need to be in the SAME path relative to theire parent:
   *     These will work
   *         .../src
   */
  var addChangedFileToTestList = function(changed) {
    if (changed.type === 'changed' && changed.path.indexOf('.js') > 0) {
      var fileTest = changed.path;

      // only want to test changed files
      // so find the JavaScript name and change it to Name*.js: IF the NameController.js changed, then the NAMEControllerSpec.js will run
      fileTest = fileTest.substring(0, fileTest.lastIndexOf('.js'));
      if (fileTest.lastIndexOf('Spec') > 0) {
        fileTest = fileTest.substring(0, fileTest.lastIndexOf('Spec'));
      }

      // check for duplicates
      // this is really overkill because if karma sees two files ['my.spec_1.js', 'my.spec_1.js'] it'll only run the test once
      // in theory if a dev is running the watch continuously over a long time with the same changes the array will
      // blow up memory, but unlikely
      var filePattern = fileTest.replace('\\src\\', '\\test\\jasmine\\').replace('/src/', '/test/jasmine/') + '.spec.js';
      // make sure the Spec file exists (i.e. my.controller.spec.js doesn't exist
      if (fs.existsSync(filePattern)) {
        console.log(1);
        var addFlag = true;
        console.log(2);
        for (var i = 0; i < config.karmaTestFiles.length; i++) {
          if (config.karmaTestFiles[i] === filePattern) {
            addFlag = false;
            break;
          }
          console.log(4);
        }
        console.log(5);
        if (addFlag) {
          config.karmaTestFiles.push(filePattern);
        }
      } else {
        console.log('Test file DOES NOT EXIST ' + filePattern);
      }
    }
  };
};
