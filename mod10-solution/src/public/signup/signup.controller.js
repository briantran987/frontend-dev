(function () {
    "use strict";
    
    angular.module('public')
    .constant('ApiPath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['$http', 'ApiPath', 'AccountService'];
    function SignUpController($http, ApiPath, AccountService) {
      var $ctrl = this;
      $ctrl.user = {};
      
      $ctrl.checkDish = function (dish) {
        if (dish.$valid) {
          let category = dish.$viewValue.match(/^[^\d]*/);
          let num = dish.$viewValue.match(/\d+/);
          $ctrl.initForm = true;
          $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + num + '.json')
          .then(function (response) {
            $ctrl.validDish = response.data != null;
            if ($ctrl.validDish) {
              $ctrl.user.dishInfo = response.data;
              AccountService.registerUser($ctrl.user);
            } 
          });;
        }
      }

      $ctrl.submit = function () {
        $ctrl.submitted = $ctrl.validDish;
      };
    }
    
    
    })();
    