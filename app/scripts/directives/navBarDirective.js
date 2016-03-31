'use strict';

angular.module('zFitnessApp')
.directive('navBar', function(){    
    return {
      restrict: 'E',
      templateUrl: '/views/nav-bar.html',
      controller: 'navBarCtrl',
      controllerAs: 'navBar'
    };      
  });