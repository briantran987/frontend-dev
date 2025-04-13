(function () {
    'use strict';
    
    angular.module('data')
    .controller('ItemsController', ItemsController);
    
    // 'item' is injected through state's resolve
    ItemsController.$inject = ['items']
    function ItemsController(items) {
      var itemList = this;
      itemList.name  =  items.category.name;
      itemList.menu = items.menu_items;
      console.log("In controller items: " + JSON.stringify(itemList.menu));

    }
    
    })();
    