(function () {
    'use strict';
    
    angular.module('MenuApp', ['data', 'ui.router']);
    
    angular.module('MenuApp')
    .config(function () {
      console.log("MenuApp config fired.");
    })
    .run(function () {
      console.log("MenuApp run fired.");
    });
    
    })();
    