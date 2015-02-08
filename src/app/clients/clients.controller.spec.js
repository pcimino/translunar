'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('Clients'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define more than 5 clients things', inject(function($controller) {
    expect(scope.clients).toBeUndefined();

    $controller('ClientsCtrl', {
      $scope: scope
    });

    expect(angular.isArray(scope.clients)).toBeTruthy();
    expect(scope.clients.length > 2).toBeTruthy();
  }));
});
