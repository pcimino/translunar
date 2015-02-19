'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('translunar'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should be defined', inject(function($controller) {

    var controller = $controller('FooterCtrl', {
      $scope: scope
    });
    expect(controller).toBeDefined();

  }));
});
