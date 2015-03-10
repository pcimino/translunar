'use strict';
(function () {
angular.module('Projects', [])
  .controller('ProjectsCtrl', function ($scope) {
    $scope.projects = [
      {
        'title': 'Bubble Base',
        'url': 'http://bb.translunardesigns.com/#/',
        'description': 'UI concept for graphical database search.',
        'logo': 'assets/images/projects/bubble.png'
      },
      {
        'title': 'Caduceus',
        'url': 'http://caduceus.translunardesigns.com/#/',
        'description': 'Rapid prototype for a healthcare client seeking a cleaner patient information intake process.',
        'logo': 'assets/images/projects/caduceus.png'
      },
      {
        'title': 'STEM Store',
        'url': 'http://stem-store.translunardesigns.com/#/',
        'description': 'A simple catalog, with a Responsive Mobile UI, created for a local high school student store.',
        'logo': 'assets/images/projects/stem.png'
      },
      {
        'title': 'Top Watch',
        'url': 'http://tw.translunardesigns.com/#/',
        'description': 'EnyoJS concept deployed on Firefox OS, Android, iOS, Windows Phone 7, WP 8 and Chrome Store.',
        'logo': 'assets/images/projects/topwatch.png'
      },
      {
        'title': 'Chrome Top Watch App',
        'url': 'https://chrome.google.com/webstore/search/TopWatch',
        'description': 'Published application to the HP webOS Catalog and Chrome Store.',
        'logo': 'assets/images/projects/topwatch.png'
      }
    ];

  });
})();
