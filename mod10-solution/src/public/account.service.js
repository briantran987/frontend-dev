(function () {
    "use strict";
    
    angular.module('public')
    .service('AccountService', AccountService);
    
    AccountService.$inject = [];
    function AccountService() {
      var service = this;
    
      service.registerUser = function (user) {
        service.user = user;
        console.log("registered: " + JSON.stringify(user));
      }
    
      service.getUserInfo = function () {
        return service.user;
      };
    
    }
    
    
    
    })();
    