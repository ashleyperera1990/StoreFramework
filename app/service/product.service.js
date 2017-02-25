angular
    .module('StoreFramework')
    .service('ProductService', ProductService);

ProductService.$inject = ['$http', '$q'];

function ProductService($http, $q) {

    var productList = [];

    var productService = {
        getProductList: getProductList,
        createProduct: createProduct
    };

    return productService;


    // -------- Methods ----------- //

    function getProductList() {
        var deferred = $q.defer();

        if (productList.length) {
            deferred.resolve(productList);
        } else {
            $http.get('http://localhost:4001/products/getAll')
                .then(function (response) {
                    deferred.resolve(response.data.data);
                    productList = response.data.data;
                });
            productList = deferred.promise;
        }
        return deferred.promise;
    }

    function createProduct(product) {
        $http.post('http://localhost:4001/create', product)
            .then(function (data) {
                return data;
            });
    }


}
