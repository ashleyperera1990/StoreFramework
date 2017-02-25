angular
    .module('StoreFramework')
    .controller('BasketController', BasketController);

BasketController.$inject = ['$rootScope', 'BasketService', '$location', 'OrderService', 'UserService', 'AuthService'];

function BasketController($rootScope, BasketService, $location, OrderService, UserService, AuthService) {

    var vm = this;

    vm.removeItem = removeItemFromBasket;
    vm.clear = clearBasket;
    vm.continueToPayDetails = continueToPayDetails;
    vm.backToBasket = backToBasket;
    vm.continueToConfirm = continueToConfirm;

    vm.isDifferentDeliveryAddress = false;
    vm.otherDeliveryDetails = {};

    initialise();

    function initialise() {
        vm.isLoggedIn = UserService.isLoggedIn();
        vm.user = UserService.getCurrentUser();
        vm.basket = BasketService.getCurrentBasket();
    }

    function clearBasket() {
        BasketService.clearBasket();
        updateBasket();
    }

    function removeItemFromBasket(item) {
        BasketService.removeFromBasket(item);
        updateBasket();
    }

    function updateBasket() {
        $rootScope.$broadcast('update-basket');
        vm.basket = BasketService.getCurrentBasket();
    }

    function continueToPayDetails() {
        if (AuthService.isLoggedIn()) {
            $location.path("/purchase.details");
        } else {
            $location.path('/');
        }

    }

    function backToBasket() {
        $location.path('/basket');
    }

    function continueToConfirm() {
        OrderService.createNewOrder(vm.basket, vm.user, vm.otherDeliveryDetails);
        $location.path("/purchase.confirm");
    }
}
