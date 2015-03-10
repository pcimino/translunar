'use strict';
// Wrap with Immediately Invoked Function Expression (IIFE)
// https://github.com/toddmotto/angularjs-styleguide#modules
(function () {
angular.module('Main', [])
  .controller('MainCtrl', function ($scope) {
    $scope.backgrounds = [];
    $scope.awesomeThings = [
      {
        'title': 'Agile Leadership',
        'url': '',
        'description': 'Certified Scrum Master, experienced teams.',
        'logo': 'assets/images/background/armstrong-siddley-turbojet.jpg'
      },
      {
        'title': 'IT Management',
        'url': '',
        'description': 'Strategy planning and resource management.',
        'logo': 'assets/images/background/armstrong-siddley-rocket.jpg'
      },
      {
        'title': 'Dev Ops',
        'url': '',
        'description': 'AWS, Chef, Puppet.',
        'logo': 'assets/images/background/bristol-olympus-turbojet.jpg'
      },
      {
        'title': 'Enterprise Architecture',
        'url': '',
        'description': 'Jav EE, Spring, ESB, RESTful API design.',
        'logo': 'assets/images/background/bristol-pegasus.jpg'
      },
      {
        'title': 'JavaScript Frameworks',
        'url': '',
        'description': 'AngularJS, Sencha, Enyo.',
        'logo': 'assets/images/background/merlin.jpg'
      },
      {
        'title': 'Mobile',
        'url': '',
        'description': 'HTML5, Cordova, PhoneGap, Responsive UI.',
        'logo': 'assets/images/background/wright-flyer.jpg'
      }

    ];

    for (var i in $scope.awesomeThings) {
      $scope.backgrounds.push($scope.awesomeThings[i].logo);
    }

  });
})();
