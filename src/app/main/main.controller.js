'use strict';
// Wrap with Immediately Invoked Function Expression (IIFE)
// https://github.com/toddmotto/angularjs-styleguide#modules
(function () {
angular.module('Main', [])
  .controller('MainCtrl', function ($scope) {
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
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
})();
