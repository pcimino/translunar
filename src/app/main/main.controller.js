'use strict';
// Wrap with Immediately Invoked Function Expression (IIFE)
// https://github.com/toddmotto/angularjs-styleguide#modules
(function () {
angular.module('Main', [])
  .controller('MainCtrl', function ($scope) {
    $scope.backgrounds = [];
    $scope.awesomeThings = [
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'assets/images/background/armstrong-siddley-turbojet.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'assets/images/background/armstrong-siddley-rocket.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'assets/images/background/bristol-olympus-turbojet.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'assets/images/background/bristol-pegasus.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'assets/images/background/merlin.jpg'
      },
      {
        'title': '',
        'url': '',
        'description': '',
        'logo': 'assets/images/background/wright-flyer.jpg'
      }

    ];

    for (var i in $scope.awesomeThings) {
      $scope.backgrounds.push($scope.awesomeThings[i].logo);
    }
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
})();
