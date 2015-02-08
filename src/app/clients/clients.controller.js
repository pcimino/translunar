'use strict';
(function () {
angular.module('Clients', [])
  .controller('ClientsCtrl', function ($scope) {
    $scope.clients = [
      {
        'title': 'Capital One',
        'url': 'https://www.capitalone.com/',
        'description': 'Online Banking',
        'logo': 'capitalone-logo-white.png'
      },
      {
        'title': 'JTE Multimedia',
        'url': 'http://jtemultimedia.com/',
        'description': 'Medical journal publications.',
        'logo': 'jte-multimedia-header.png'
      },
      {
        'title': 'Sanofi Aventis',
        'url': 'http://www.sanofi.us/l/us/en/index.jsp',
        'description': 'Pharmaceuticals',
        'logo': 'Sanofi-Aventis-logo.jpg'
      },
      {
        'title': 'LIFE ScapeS',
        'url': 'http://life-scapes.com/',
        'description': 'Healthcare Marketing',
        'logo': 'life-scapes.jpg'
      },
      {
        'title': 'Elsevier',
        'url': 'http://www.elsevier.com/',
        'description': 'Medical Publications and Educational Materials',
        'logo': 'elsevier.jpg'
      },
      {
        'title': 'Wing Span Bank',
        'url': 'http://en.wikipedia.org/wiki/Wingspan_Bank',
        'description': 'Internet Banking.',
        'logo': 'Wingspan_Bank_Logo.png'
      },
      {
        'title': 'ING Direct',
        'url': 'https://home.capitalone360.com/redirect',
        'description': 'Online Banking',
        'logo': 'ING-Direct.gif'
      },
      {
        'title': 'Juniper Bank',
        'url': 'https://www.barclaycardus.com/',
        'description': 'Online Banking & Consumer Credit',
        'logo': 'Juniper-bank.png'
      },
      {
        'title': 'Studio Prep',
        'url': 'http://studioprep.com/#/',
        'description': 'Non-profit helping students interested in careers in design.',
        'logo': 'studioprep.jpg'
      },
      {
        'title': 'First USA',
        'url': 'http://en.wikipedia.org/wiki/Bank_One_Corporation',
        'description': 'Branded Credit Cards',
        'logo': 'Portfolio_FirstUSA_logo_225.png'
      },
      {
        'title': 'Kaloke Technologies',
        'url': 'http://www.kaloke.com/home/index.htm',
        'description': 'Software Architecture',
        'logo': 'transkaloke.gif'
      },
      {
        'title': 'Vertex Inc.',
        'url': 'http://vertexinc.com/',
        'description': 'Tax solution software.',
        'logo': 'vertex-logo.jpg'
      }
    ];
    angular.forEach($scope.clients, function(clientItem) {
      clientItem.rank = Math.random();
    });
  });
})();
