'use strict';

angular.module('zFitnessApp')
.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover',
           ' background-position': 'center center',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed',
            'background-size': 'cover',  
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover'
        });
    };
  })  