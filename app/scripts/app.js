'use strict';

/**
 * @ngdoc overview
 * @name zFitnessAppApp
 * @description
 * # zFitnessAppApp
 *
 * Main module of the application.
 */
angular
  .module('zFitnessApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])  
  .config(function ($routeProvider) {
    $routeProvider      
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',        
      })
      .when('/home',{
        templateUrl: 'views/home.html',
        controller: 'homeCtrl' 
      })
      .when('/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'signUpCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function($rootScope, $location, loginService){
  var routespermission=['/home'];  //rutas que requieren el login
  $rootScope.$on('$routeChangeStart', function(){

    if( routespermission.indexOf($location.path()) !=-1 && !loginService.islogged()) {     
      $location.path('/login');
    }

    if ($location.path() === '/login' && loginService.islogged()) {
      $location.path('/home');
    }

  });
});
