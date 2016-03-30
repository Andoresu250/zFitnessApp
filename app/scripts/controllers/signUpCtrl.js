'use strict'

angular.module('zFitnessApp')
	.controller('signUpCtrl', ['$scope', function ($scope) {
		$scope.msgtxt='';
		var ref = new Firebase("https://zfitnessapp.firebaseio.com/users");
		$scope.signUp = function (newUser) {
			ref.push(newUser);
		}
	}]);