'use strict';
(function () {
angular.module('translunar')
<<<<<<< Updated upstream
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.navItems = [
=======
  .controller('NavbarCtrl', function ($scope, $location, $document) {
    $scope.nav = [
>>>>>>> Stashed changes
      {path:'#/home', desc:'Home'},
      {path:'#/about', desc:'About'},
      {path:'#/clients', desc:'Clients'},
      {path:'#/projects', desc:'Projects'},
      {path:'#/contact', desc:'Contact'},
    ];

    // http://coder1.com/articles/angularjs-managing-active-nav-elements
    // http://jsfiddle.net/uDPHL/146/
    $scope.isActive = function(navItem) {
      var currentRoute = $location.path().substring(1) || $scope.nav[0].path.substring(2);
      var pathIndex = navItem.path.indexOf(currentRoute);

      return pathIndex > 0 ? 'active' : '';
    };
    $document.foundation('topbar');
  });
})();
