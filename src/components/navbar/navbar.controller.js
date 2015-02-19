'use strict';
(function () {
angular.module('translunar')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.nav = [
      {path:'#/home', desc:'Home'},
      {path:'#/about', desc:'About'},
      {path:'#/clients', desc:'Clients'},
      {path:'#/projects', desc:'Projects'},
      {path:'#/contact', desc:'Contact'},
    ];
    $scope.navClass = function(page) {
      var currentRoute = $location.path().substring(1) || 'home';
      var page = currentRoute ? 'active' : '';
      console.log('AAAA ' + page +":" + currentRoute +":"+$location.path().substring(1)+":"+page);

      return page;
    };
  });
})();
