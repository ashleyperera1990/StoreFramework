angular
    .module('StoreFramework')
    .controller('OrderController', OrderController);

OrderController.$inject = ['$location', 'OrderService', 'UserService', 'BasketService'];

function OrderController($location, OrderService, UserService, BasketService) {

    var vm = this;

    vm.submitOrder = submitOrder;
    vm.getPreviousOrders = getPreviousOrders;
    vm.getOrder = getOrder;

    initialise();

    function initialise() {
        vm.user = UserService.getCurrentUser();
        vm.order = OrderService.getCurrentOrder();
        vm.isPreviousOrder = false;

        if (vm.order._id) {
            vm.isPreviousOrder = true;
        }

    }

    function submitOrder() {
        OrderService.submitOrder(vm.order)
            .then(function () {
                BasketService.clearBasket();
                $location.path('/purchase.success');
            });
    }

    function getPreviousOrders() {
        OrderService.getPreviousOrders(vm.user._id)
            .then(function (orders) {
                vm.previousOrders = orders;
            });
    }

    function getOrder(order) {
        OrderService.getOrderById(order._id)
            .then(function () {
                $location.path('/purchase.confirm');
            });
    }
}