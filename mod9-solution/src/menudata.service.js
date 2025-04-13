(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('URLBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");
    
    MenuDataService.$inject = ['$http', 'URLBasePath']
    function MenuDataService($http, URLBasePath) {
      var service = this;

      service.getAllCategories = function() {
        return $http({
            method: "GET",
            url: (URLBasePath + "/categories.json")
        })
        .then(function (result){
            console.log(`All Categories :\n` + JSON.stringify(result));
            return result.data;
        });
      }

      service.getItemsForCategory = function(categoryShortName) {
        return $http({
            method: "GET",
            url: (URLBasePath + `/menu_items/${categoryShortName}.json`)
        })
        .then(function (result){
            console.log(`Items for ${categoryShortName} :\n` + JSON.stringify(result));
            return result.data;
        });
      }
    }
    
    })();
    