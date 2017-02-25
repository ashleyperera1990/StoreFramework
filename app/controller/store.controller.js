angular
    .module('StoreFramework')
    .controller('StoreController', StoreController);

StoreController.$inject = ['BasketService', 'ProductService', 'UserService'];

function StoreController(BasketService, ProductService, UserService) {

    var vm = this;

    vm.addToBasket = addToBasket;
    initialise();

    function initialise() {
        vm.user = UserService.getCurrentUser();
        getItemsForSale();
    }

    function getItemsForSale() {
        ProductService.getProductList()
            .then(function (productList) {
                vm.itemsForSale = productList;
            });
    }

    function addToBasket(item) {
        BasketService.addToBasket(item);
    }


}