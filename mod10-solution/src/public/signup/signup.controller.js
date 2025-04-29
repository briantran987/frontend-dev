(function () {
    "use strict";
    
    angular.module('public')
    .constant('ApiPath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['$http', 'ApiPath', 'AccountService'];
    function SignUpController($http, ApiPath, AccountService) {
      var $ctrl = this;
      
      $ctrl.submit = function () {
        $ctrl.submitted = true;

        $http.get(ApiPath + '/menu_items/' + $ctrl.user.dish[0] + '/menu_items/' + $ctrl.user.dish[1] + '.json')
        .then(function (response) {
          $ctrl.completed = response.data != null;
          if ($ctrl.completed) {
            $ctrl.user.dishInfo = response.data;
            console.log(JSON.stringify($ctrl.user.dishInfo));
            AccountService.registerUser($ctrl.user);
          }
        });;
      };
    }
    
    
    })();
    