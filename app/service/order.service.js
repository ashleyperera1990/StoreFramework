angular
    .module('StoreFramework')
    .service('OrderService', OrderService);

OrderService.$inject = ['$http', '$q'];

function OrderService($http, $q) {

    var currentOrder = {};

    var service = {
        createNewOrder: createNewOrder,
        submitOrder: submitOrder,
        getCurrentOrder: getCurrentOrder,
        getPreviousOrders: getPreviousOrders,
        getOrderById: getOrderById
    };

    return service;

    // -------- Methods ----------- //

    function createNewOrder(basket, user, otherAddress) {
        var order = {
            userId: user._id,
            firstName: user.firstName,
            surname: user.surname,
            billingAddress: user.address,
            dateOrdered: new Date(),
            items: basket.items,
            total: basket.total
        };
        // Check for different delivery address
        // else set it to the billing address
        if (otherAddress.addressLine1) {
            order.deliveryAddress = otherAddress;
        } else {
            order.deliveryAddress = order.billingAddress;
        }

        currentOrder = order;
        return currentOrder;
    }

    function getCurrentOrder() {
        return currentOrder;
    }

    function submitOrder(order) {
        var deferred = $q.defer();

        $http.post('http://localhost:4001/submitOrder', order)
            .then(function (data) {
                deferred.resolve(data);
            });
        return deferred.promise;
    }

    function getPreviousOrders(userId) {
        var deferred = $q.defer();

        $http.get('http://localhost:4001/getPreviousOrders/' + userId)
            .then(function (res) {
                deferred.resolve(res.data.orders);
            });
        return deferred.promise;
    }
    
    function getOrderById(orderId) {
        var deferred = $q.defer();

        $http.get('http://localhost:4001/getOrder/' + orderId)
            .then(function (res) {
                deferred.resolve(res.data.order);
                currentOrder = res.data.order;
            });
        return deferred.promise;
    }

}
