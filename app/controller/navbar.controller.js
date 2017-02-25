angular
    .module('StoreFramework')
    .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$rootScope', '$scope', 'UserService', 'BasketService'];

function NavbarController($rootScope, $scope, UserService, BasketService) {

    var vm = this;

    initialise();

    vm.isLoggedIn = false;

    function initialise() {
        vm.user = UserService.getCurrentUser();
        vm.basket = BasketService.getCurrentBasket();
    }

    $scope.$on('user-logged-in', function () {
        vm.user = UserService.getCurrentUser();
        vm.isLoggedIn = true;
    });

    $scope.$on('update-basket', function () {
        vm.basket = BasketService.getCurrentBasket();
    });

}