'use strict';
// Wrap with Immediately Invoked Function Expression (IIFE)
// https://github.com/toddmotto/angularjs-styleguide#modules
(function () {
angular.module('Main', [])
  .controller('MainCtrl', function ($scope) {
    var basePath = 'assets/images/background/';
    $scope.backgrounds = [];
    $scope.awesomeThings = [
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'armstrong-siddley-turbojet.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'armstrong-siddley-rocket.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'bristol-olympus-turbojet.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'bristol-pegasus.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'merlin.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'wright-flyer.jpg'
      }

    ];

    for (var i in $scope.awesomeThings) {
      $scope.backgrounds.push(basePath + $scope.awesomeThings[i].logo);
    }
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
})();
