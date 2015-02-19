'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('About'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should be defined', inject(function($controller) {
    var controller = $controller('AboutCtrl', {
      $scope: scope
    });
    expect(controller).toBeDefined();

  }));
});
