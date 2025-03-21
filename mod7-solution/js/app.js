(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getBuyList();
    buyList.empty = (buyList.items.length == 0);

    buyList.buy = function (itemIndex) {
        ShoppingListCheckOffService.buy(itemIndex);
        buyList.empty = (buyList.items.length == 0);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtList();
}

function ShoppingListCheckOffService () {
    var service = this;
    var toBuy = [   
                    {name: "steaks", quantity: 2, pricePerItem: 11},
                    {name: "cookies", quantity: 5, pricePerItem: 2}, 
                    {name: "apples", quantity: 2, pricePerItem: 4}
                ];
    var bought = [];

    service.buy = function (itemIndex) {
        var boughtItem = toBuy.splice(itemIndex, 1);
        bought.push(boughtItem[0]);
    };

    service.getBuyList = function () {
        return toBuy;
    };

    service.getBoughtList = function () {
        return bought;
    };
}



})();