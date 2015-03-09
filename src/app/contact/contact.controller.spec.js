'use strict';

describe('controllers', function(){
  beforeEach(module('Contact'));

  it('should be defined', inject(function($controller) {
    var controller = $controller('ContactCtrl', {

    });

    expect(controller).toBeDefined();

  }));
});
