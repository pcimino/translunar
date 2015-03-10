'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('Projects'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define more than 5 projects things', inject(function($controller) {
    expect(scope.clients).toBeUndefined();

    $controller('ProjectsCtrl', {
      $scope: scope
    });

    expect(angular.isArray(scope.projects)).toBeTruthy();
    expect(scope.projects.length > 2).toBeTruthy();
  }));
  });
