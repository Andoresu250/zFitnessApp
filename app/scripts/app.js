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
    'firebase',
    'ngStorage'
  ])  
  .config(function (loginServiceProvider, $routeProvider) {
    $routeProvider      
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        redirectTo: function(){
          if(loginServiceProvider.$get().islogged()){
            return '/home';
          }
        }             
      })
      .when('/home',{
        templateUrl: 'views/home.html',
        controller: 'homeCtrl',
        redirectTo: function(){
          if(!loginServiceProvider.$get().islogged()){
            return '/login';
          }
        }  
      })
      .when('/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'signUpCtrl',
        redirectTo: function(){
          if(loginServiceProvider.$get().islogged()){
            return '/home';
          }
        }             
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function(sessionService, $localStorage, $cookieStore){
    try{
        if($cookieStore.get('token') !== undefined){
            sessionService.set('token', $cookieStore.get('token'));
        }else{
          if($localStorage.auth.token !== null){
            sessionService.set('token', $localStorage.auth.token);
          }
        }        
      }catch(err){
        
      }
  });