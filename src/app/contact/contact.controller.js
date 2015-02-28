'use strict';
(function () {
angular.module('Contact', [])
  .controller('ContactCtrl', function ($scope) {
    $scope.awesomeThings = [
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
})();
