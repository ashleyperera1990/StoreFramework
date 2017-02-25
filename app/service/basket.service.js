angular
    .module('StoreFramework')
    .service('BasketService', BasketService);

BasketService.$inject = [];

function BasketService() {

    var basket = {};
    basket.items = [];
    basket.total = 0;

    var basketService = {
        getCurrentBasket: getCurrentBasket,
        getItemsInBasket: getItemsInBasket,
        addToBasket: addToBasket,
        removeFromBasket: removeFromBasket,
        clearBasket: clearBasket
    };

    return basketService;

    // -------- Methods ----------- //

    function getCurrentBasket() {
        return basket;
    }

    function getItemsInBasket() {
        return basket.items;
    }

    function addToBasket(item) {
        if (isInBasket(item)) {
            for (var i = 0; i < basket.items.length; i++) {
                if (basket.items[i].id === item.id) {
                    basket.items[i].quantity = basket.items[i].quantity + 1;
                    basket.items[i].subTotal = basket.items[i].subTotal + basket.items[i].price;
                }
            }
        } else {
            item.quantity = 1;
            item.subTotal = item.price;
            basket.items.push(item);
        }
        setTotal();
    }

    function removeFromBasket(item) {
        if (isInBasket(item)) {
            var index = basket.items.indexOf(item);
            if (basket.items[index].quantity > 1) {
                basket.items[index].quantity = basket.items[index].quantity - 1;
                basket.items[index].subTotal = basket.items[index].subTotal - basket.items[index].price;
            } else {
                basket.items.splice(index, 1);
            }
        }
        setTotal();
        return basket;
    }

    function setTotal() {
        basket.total = 0;
        for (var i = 0; i < basket.items.length; i++) {
            basket.total = basket.total + (basket.items[i].price * basket.items[i].quantity);
        }
        return basket.total;
    }


    function clearBasket() {
        basket.items = [];
        basket.total = 0;
    }

    function isInBasket(item) {
        var isInBasket = false;
        var index = basket.items.indexOf(item);
        if (index !== -1) {
            isInBasket = true;
        }
        return isInBasket;
    }

}