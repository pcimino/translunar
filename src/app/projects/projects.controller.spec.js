'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('Projects'));

    it('should be defined', inject(function($controller) {
      var controller = $controller('ProjectsCtrl', {
        $scope: scope
      });

      expect(controller).toBeDefined();

    }));
  });
