'use strict';

angular.module('zFitnessApp')
	.controller('signUpCtrl', ['$scope', '$location', '$rootScope', function ($scope,$location,$rootScope) {
		$scope.msgtxt='';		
		$scope.signUp = function (newUser) {
			var ref = new Firebase("https://zfitnessapp.firebaseio.com");
			ref.createUser({
				email 	 : newUser.email,
				password : newUser.pass
			}, function(error, userData){
				if(error){
					console.log("Error creating user:", error);
				} else {
					var user = {
						uid  : userData.uid,
						name : newUser.name,
						cc   : newUser.cc 
					};
					var userRef = new Firebase("https://zfitnessapp.firebaseio.com/usersProfile");
					userRef.push(user);
					console.log("Se creo sastifactoriamente el usuario con uid:", userData.uid);
					$location.path('/login');
					if (!$rootScope.$$phase){
					 	$rootScope.$apply();					 	
					}

				}
			});
		};
	}]);