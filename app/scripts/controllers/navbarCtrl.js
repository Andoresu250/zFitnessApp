'use strict';

/**
 * @ngdoc function
 * @name zFitnessAppApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the zFitnessAppApp
 */
angular.module('zFitnessApp')
  .controller('navBarCtrl', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {
    this.isActive = function(viewLocation) {
      return viewLocation !== $location.path();
    };
    this.logout = function(){
    	loginService.logout();
    };
    
  }]);
