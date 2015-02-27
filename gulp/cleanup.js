/**
 * cleanup.js is responsible for deleting build directories
 */
module.exports = function(gulp, runSequence, config) {
  'use strict';

  /** Clean up  */
  gulp.task('clean', ['clean-coverage'], function (done) {
    return config.del(['.sass-cache/', config.BUILD + '/', config.TARGET + '/'], done);
  });
  gulp.task('clean-coverage', function (done) {
    return config.del([config.TMP + '/', config.DIST + '/', config.COVERAGE + '/'], done);
  });
  gulp.task('clean-bower-lib', function (done) {
    return config.del([config.BUILD + 'lib/'], done);
  });
  /** End Cleanup */

};
