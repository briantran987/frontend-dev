(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.input = "";
    $scope.message = "";
    $scope.borderColor = {};
    $scope.textColor = {};

    $scope.checkIfTooMuch = function () {
        const items = $scope.input.split(",");
        var numItems = items.reduce((acc, curr) => {
            if (curr.trim().length == 0) acc--;
            return acc;
        }, items.length);

        if (numItems > 0) {
            if (numItems > 3) {
                $scope.message = "Too much!";
            } else {
                $scope.message = "Enjoy!";
            }
    
            $scope.borderColor = { 'border' : "1px solid green" };
            $scope.textColor = { 'color' : "green" };
        } else {
            $scope.message = "Please enter data first";
            $scope.borderColor = { 'border' : "1px solid red" };
            $scope.textColor = { 'color' : "red" };
        }
    };
}
})();