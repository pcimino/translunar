'use strict';
(function () {
angular.module('translunar')
  .controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
  });
})();
