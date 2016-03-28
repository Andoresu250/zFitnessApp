'use strict';

/**
 * @ngdoc function
 * @name zFitnessAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the zFitnessAppApp
 */
angular.module('zFitnessApp')	
	.controller('loginCtrl', ['$scope','loginService', function ($scope,loginService) {
		$scope.msgtxt='';
		$scope.login=function(data){
			loginService.login(data,$scope); //call login service
		};
	}]);
