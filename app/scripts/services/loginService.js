'use strict'

angular.module('zFitnessApp')
.factory('loginService',  function($http,$location,sessionService){
	return {
		login: function(data,scope){			
			var $promise=$http.post('data/user.php', data);
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

			});
		},		
		logout: function(){
			sessionService.destroy('user');
			$location.path('/login');
		},
		islogged:function(){
					
			if(sessionService.get('user')) return true;
			else return false;
			
		}
	};
});