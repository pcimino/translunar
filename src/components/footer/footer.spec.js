'use strict';

describe('controllers', function(){
  beforeEach(module('translunar'));

  beforeEach(inject(function() {
  }));

  it('should be defined', inject(function($controller) {

    var controller = $controller('FooterCtrl', {
    });
    expect(controller).toBeDefined();

  }));
});
