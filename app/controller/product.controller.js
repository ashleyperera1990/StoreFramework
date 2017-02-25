angular
    .module('StoreFramework')
    .controller('ProductController', ProductController);

ProductController.$inject = ['ProductService', '$location', 'UserService'];

function ProductController(ProductService, $location, UserService) {

    var vm = this;

    vm.product = {};
    vm.addProduct = addNewProduct;
    vm.clearProduct = clearProduct;

    initialise();
    
    function initialise() {
        vm.user = UserService.getCurrentUser();

    }

    function addNewProduct() {
        vm.product = ProductService.createProduct(vm.product);
        clearProduct();
        $location.path('/add.success/');
    }

    function clearProduct() {
        vm.product = {};
    }

}