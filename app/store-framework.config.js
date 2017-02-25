angular
    .module('StoreFramework')
    .config([
        '$locationProvider',
        '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            // routes
            $routeProvider
                .when("/", {
                    templateUrl: "views/user/login.view.html",
                    controller: "UserController",
                    controllerAs: 'vm'
                })
                .when("/login-success", {
                    templateUrl: "views/user/login-success.view.html",
                    controller: "UserController",
                    controllerAs: 'vm'
                })
                .when("/store", {
                    templateUrl: "views/store.view.html",
                    controller: "StoreController",
                    controllerAs: 'vm'
                })
                .when("/basket", {
                    templateUrl: "views/basket.view.html",
                    controller: "BasketController",
                    controllerAs: 'vm'
                })
                .when("/purchase.details", {
                    templateUrl: "views/order/order-details.view.html",
                    controller: "BasketController",
                    controllerAs: 'vm'
                })
                .when("/purchase.confirm", {
                    templateUrl: "views/order/order-summary.view.html",
                    controller: "OrderController",
                    controllerAs: 'vm'
                })
                .when("/purchase.success", {
                    templateUrl: "views/order/order-success.view.html"
                })
                .when("/addProduct", {
                    templateUrl: "views/product/add-product.view.html",
                    controller: "ProductController",
                    controllerAs: 'vm'
                })
                .when("/add.success", {
                    templateUrl: "views/product/add-success.view.html",
                    controller: "ProductController",
                    controllerAs: 'vm'
                })
                .when("/register", {
                    templateUrl: "views/user/register-user.view.html",
                    controller: "UserController",
                    controllerAs: 'vm'
                })
                .when("/previous.orders", {
                    templateUrl: "views/order/order-history.view.html",
                    controller: "OrderController",
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
