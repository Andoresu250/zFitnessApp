'use strict';

angular.module('zFitnessApp')
.factory('loginService',  function($rootScope,$location,sessionService){
	return {
		login: function(userData,scope){	
			var ref = new Firebase("https://zfitnessapp.firebaseio.com");
			ref.authWithPassword({
				email      : userData.email,
				password   : userData.pass
			}, function( error, authData){
				if( error ){
					console.log('Login Failed', error);
					scope.msgtxt = 'Error information';
					$location.path('/login');
				} else {
					console.log('Login Ok with', authData);
					sessionService.set('user',authData.uid);
					$location.path('/home');
					if (!$rootScope.$$phase){
					 	$rootScope.$apply();
					}
				}
			});		
			/*var $promise=$http.post('data/user.php', data);
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					//scope.msgtxt = 'Correct information';
					sessionService.set('user',uid);
					$location.path('/home');
				} 
				else {
					scope.msgtxt = 'Error information';
					$location.path('/login');
				}

			});*/
		},		
		logout: function(){
			sessionService.destroy('user');
			$location.path('/login');
		},
		islogged:function(){
					
			if(sessionService.get('user')){
			 	return true;
			}
			else{
				return false;	
			} 
			
		}
	};
});