'use strict';

angular.module('zFitnessApp')
.factory('loginService',  function($rootScope,$location,sessionService, $localStorage, $cookieStore){
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
					if(userData.remember_me){
						$localStorage.auth = {
							token: authData.token,
							selected: userData.remember_me
						};						
					}else{
						$cookieStore.put('token', authData.token);						
					}
					sessionService.set('token', authData.token);
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
			sessionService.destroy('token');			
			$localStorage.auth = {
		        token: null,
		        selected: null
		    }
		    $cookieStore.put('token', undefined);
			$location.path('/login');
		},
		islogged:function(){			
			if(sessionService.get('token')){
			 	return true;
			}
			else{
				try{
        			return $cookieStore.get('token') !== undefined || $localStorage.auth.token !== null;
				}catch(err){
					this.logout();
					return false;
				}				
			} 
			
		}
	};
});