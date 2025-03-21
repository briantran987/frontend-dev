(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('URLBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'menu',
        bindToController: true
    };

    return ddo;
}

function FoundItemsDirectiveController() {
    var found = this;

    found.noItemsFound = function () {
        if (found.items.length === 0) {
        return true;
        }

        return false;
    };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTerm = "";
    menu.found = [];

    menu.search = function () {
        MenuSearchService.getMatchedMenuItems(menu.searchTerm).then (function (response) {
            menu.found = response.data;
            console.log(menu.found);
        });
    }

    menu.removeItem = function (itemIndex) {
        menu.found.splice(itemIndex, 1);
    }
}

MenuSearchService.$inject = ['$http', 'URLBasePath'];
function MenuSearchService ($http, URLBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: "GET",
            url: (URLBasePath + "/menu_items.json")
        })
        .then(function (result){
            var items = [];

            if (searchTerm !== "") {
                Object.values(result.data).forEach(menu => {
                    items = items.concat(menu.menu_items);
                });
    
                items = items.filter(item => item.description.indexOf(searchTerm) !== -1);
                result.data = items;
            }

            return result;
        });
    }
}



})();