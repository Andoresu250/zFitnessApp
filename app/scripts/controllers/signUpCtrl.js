'use strict';

angular.module('zFitnessApp')
	.controller('signUpCtrl', function ($scope,$location,$rootScope) {

		$scope.msgError = [];	
		$scope.emailError = ['Please enter a valid EMAIL', 'Your EMAIL is already in use, please choose another or check if you have an error'];		
		$scope.firstNameError = ['Your FIRST NAME can only contain letters and spaces', 'Your FIRST NAME must have minimum 3 letters'];
		$scope.lastNameError = ['Your LAST NAME can only contain letters and spaces' , 'Your LAST NAME must have minimum 53letters'];
		$scope.ccError = ['Your CC can only contain numbers and had 8 or more digits','Your CC is already in use, check if you have an error'];
		$scope.passError = ['Your PASSWORD can only 8 or more characters'];
		$scope.rePassError = ['Your PASSWORD CONFIRMATION does not match with your PASSWORD'];
		$scope.phoneError = ['Your Phone can only contain numbers and have 7 or more digits'];

		$scope.emailMsg = '';
		$scope.emailOk = false;	

		$scope.firstNameMsg = '';
		$scope.firstNameOk = false;

		$scope.lastNameMsg = '';
		$scope.lastNameOk = false;

		$scope.ccMsg = '';
		$scope.ccOk = false;

		$scope.phoneMsg = '';
		$scope.phoneOk = false;

		$scope.passMsg = '';
		$scope.passOk = false;

		$scope.passReMsg = '';
		$scope.passReOk = false;

		$scope.checkEmail = function (){			
			if($scope.newUser.email !== undefined){
				if(isEmail($scope.newUser.email)){
					$scope.emailMsg = '';						
					deleteFromMessage($scope.emailError[0]);			
					$scope.emailOk = true;
				}else{	
					if(!haveMessage($scope.emailError[0])){
						$scope.msgError.push($scope.emailError[0]);
					}
					$scope.emailMsg = 'Invalid Email';
					$scope.emailOk = false;
				}
			}else{
				$scope.emailMsg = 'required Email';
				$scope.emailOk = false;
			}			
		}

		$scope.checkCC = function (){
			if($scope.newUser.cc !== undefined){
				if(isInt($scope.newUser.cc) && ($scope.newUser.cc+"").length >= 8){
					$scope.ccMsg = '';						
					deleteFromMessage($scope.ccError[0]);			
					$scope.ccOk = true;
				}else{		
					if(!haveMessage($scope.ccError[0])){
						$scope.msgError.push($scope.ccError[0]);
					}		
					$scope.ccMsg = 'Invalid CC';
					$scope.ccOk = false;
				}
			}else{
				$scope.ccMsg = 'required CC';
				$scope.ccOk = false;
			}	
		}

		$scope.checkPhone = function (){
			if($scope.newUser.phone !== undefined){
				if(isInt($scope.newUser.phone) && ($scope.newUser.phone+"").length >= 8){
					$scope.phoneMsg = '';				
					$scope.phoneOk = true;
					deleteFromMessage($scope.phoneError[0]);
				}else{			
					if(!haveMessage($scope.phoneError[0])){
						$scope.msgError.push($scope.phoneError[0]);
					}	
					$scope.phoneMsg = 'Invalid Phone';
					$scope.phoneOk = false;
				}
			}else{
				$scope.phoneMsg = 'required Phone';
				$scope.phoneOk = false;
			}	
		}

		$scope.checkFirstName = function (){
			if($scope.newUser.firstName !== undefined){
				if(isName(removeExtraSpaces($scope.newUser.firstName)) && removeExtraSpaces($scope.newUser.firstName).length >= 3){
					$scope.firstNameMsg = '';				
					$scope.firstNameOk = true;
					deleteFromMessage($scope.firstNameError[0]);
					deleteFromMessage($scope.firstNameError[1]);
				}else{	
					if(removeExtraSpaces($scope.newUser.firstName).length < 3){
						if(!haveMessage($scope.firstNameError[1])){
							$scope.msgError.push($scope.firstNameError[1]);
						}
					}	
					if(!isName(removeExtraSpaces($scope.newUser.firstName))){
						if(!haveMessage($scope.firstNameError[0])){
							$scope.msgError.push($scope.firstNameError[0]);
						}
					}
					$scope.firstNameMsg = 'Invalid First Name';
					$scope.firstNameOk = false;
				}
			}else{
				$scope.firstNameMsg = 'required First Name';
				$scope.firstNameOk = false;
			}	
		}

		$scope.checkLastName = function (){
			if($scope.newUser.lastName !== undefined){
				if(isName(removeExtraSpaces($scope.newUser.lastName)) && removeExtraSpaces($scope.newUser.lastName).length >= 3){
					$scope.lastNameMsg = '';									
					$scope.lastNameOk = true;
					deleteFromMessage($scope.lastNameError[0]);
					deleteFromMessage($scope.lastNameError[1]);
				}else{		
					if(removeExtraSpaces($scope.newUser.lastName).length < 3){
						if(!haveMessage($scope.lastNameError[1])){
							$scope.msgError.push($scope.lastNameError[1]);
						}
					}	
					if(!isName(removeExtraSpaces($scope.newUser.lastName))){
						if(!haveMessage($scope.lastNameError[0])){
							$scope.msgError.push($scope.lastNameError[0]);
						}
					}	
					$scope.lastNameMsg = 'Invalid Last Name';
					$scope.lastNameOk = false;
				}
			}else{
				$scope.lastNameMsg = 'required Last Name';
				$scope.lastNameOk = false;
			}	
		}

		$scope.checkPass = function(){
			checkRePass();
			if($scope.newUser.pass !== undefined){
				if(isValidPass($scope.newUser.pass)){
					$scope.passMsg = '';				
					$scope.passOk = true;
					deleteFromMessage($scope.passError[0]);
				}else{		
					if(!haveMessage($scope.passError[0])){
						$scope.msgError.push($scope.passError[0]);
					}		
					$scope.passMsg = 'Invalid Password';
					$scope.passOk = false;
				}
			}else{
				$scope.passMsg = 'required Password';
				$scope.passOk = false;
			}	
		}

		$scope.checkRePass = function(){
			if($scope.newUser.rePass !== undefined){
				if($scope.newUser.pass === $scope.newUser.rePass){
					$scope.passReMsg = '';				
					$scope.passReOk = true;
					deleteFromMessage($scope.rePassError[0]);
				}else{			
					if(!haveMessage($scope.rePassError[0])){
						$scope.msgError.push($scope.rePassError[0]);
					}	
					$scope.passReMsg = 'Invalid Password Confirmation';
					$scope.passReOk = false;
				}
			}else{
				$scope.passReMsg = 'required Password Confirmation';
				$scope.passReOk = false;
			}	
		}

		function checkRePass(){
			if($scope.newUser.rePass !== undefined){
				if($scope.newUser.pass === $scope.newUser.rePass){
					$scope.passReMsg = '';				
					$scope.passReOk = true;
					deleteFromMessage($scope.rePassError[0]);
				}else{			
					if(!haveMessage($scope.rePassError[0])){
						$scope.msgError.push($scope.rePassError[0]);
					}	
					$scope.passReMsg = 'Invalid Password Confirmation';
					$scope.passReOk = false;
				}
			}else{
				$scope.passReMsg = 'required Password Confirmation';
				$scope.passReOk = false;
			}	
		}

		function haveMessage(string){
			return ($scope.msgError.indexOf(string) > -1);
		}

		function deleteFromMessage(string){
			var index = $scope.msgError.indexOf(string);
			if(index > -1){
				$scope.msgError.splice(index,1);
			}			
		}

		function isEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}

		function isInt(n){
			var re = /^[0-9]+$/
		    return re.test(n);
		}

		function isName(name){
			var NAME_REGEXP = new RegExp('^[a-zA-Z ]+$');
			return NAME_REGEXP.test(name);			
		}

		function isValidPass(pass){
			return pass.length >= 8;
		}

		function removeExtraSpaces(string){
			return string.replace(/\s+/g, " ");
		}


		$scope.signUp = function (newUser) {
			var ref = new Firebase("https://zfitnessapp.firebaseio.com");
			ref.createUser({
				email 	 : newUser.email,
				password : newUser.pass
			}, function(error, userData){
				if(error){
					console.log("Error creating user:", error);					
					$scope.msgtxt = error + "";
					if (!$rootScope.$$phase){
					 	$rootScope.$apply();					 	
					}
				} else {
					var user = {
						uid       : userData.uid,
						firstName : newUser.firstName,
						lastName  : newUser.lastName,
						cc        : newUser.cc,
						phone     : newUser.phone

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
	});