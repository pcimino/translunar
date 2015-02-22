'use strict';
(function () {
angular.module('Clients', [])
  .controller('ClientsCtrl', function ($scope) {
    $scope.clients = [
      {
        'title': 'Capital One',
        'url': 'https://www.capitalone.com/',
        'description': 'Online Banking',
        'logo': 'client/capital-one.png'
      },
      {
        'title': 'JTE Multimedia',
        'url': 'http://jtemultimedia.com/',
        'description': 'Medical journal publications.',
        'logo': 'client/jte-multimedia.png'
      },
      {
        'title': 'Sanofi Aventis',
        'url': 'http://www.sanofi.us/l/us/en/index.jsp',
        'description': 'Pharmaceuticals',
        'logo': 'client/sanofi-aventis.png'
      },
      {
        'title': 'LIFE ScapeS',
        'url': 'http://life-scapes.com/',
        'description': 'Healthcare Marketing',
        'logo': 'client/life-scapes.png'
      },
      {
        'title': 'Wing Span Bank',
        'url': 'http://en.wikipedia.org/wiki/Wingspan_Bank',
        'description': 'Internet Banking.',
        'logo': 'client/wingspan-bank.png'
      },
      {
        'title': 'ING Direct',
        'url': 'https://home.capitalone360.com/redirect',
        'description': 'Online Banking',
        'logo': 'client/ing-direct.png'
      },
      {
        'title': 'Juniper Bank',
        'url': 'https://www.barclaycardus.com/',
        'description': 'Online Banking & Consumer Credit',
        'logo': 'client/juniper-bank.png'
      },
      {
        'title': 'Studio Prep',
        'url': 'http://studioprep.com/#/',
        'description': 'Non-profit helping students interested in careers in design.',
        'logo': 'client/studio-prep.png'
      },
      {
        'title': 'First USA',
        'url': 'http://en.wikipedia.org/wiki/Bank_One_Corporation',
        'description': 'Branded Credit Cards',
        'logo': 'client/first-usa.png'
      },
      {
        'title': 'Kaloke Technologies',
        'url': 'http://www.kaloke.com/home/index.htm',
        'description': 'Software Architecture',
        'logo': 'client/kaloke.png'
      },
      {
        'title': 'Vertex Inc.',
        'url': 'http://vertexinc.com/',
        'description': 'Tax solution software.',
        'logo': 'client/vertex.png'
      },
      {
        'title': 'Elsevier',
        'url': 'http://www.elsevier.com/',
        'description': 'Medical Publications and Educational Materials',
        'logo': 'client/elsevier.png'
      }
    ];
    angular.forEach($scope.clients, function(clientItem) {
      clientItem.rank = Math.random();
    });
  });
})();
