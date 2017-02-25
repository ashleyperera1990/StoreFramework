angular
    .module('StoreFramework')
    .controller('UserController', UserController);

UserController.$inject = ['UserService', 'AuthService', '$location', '$rootScope'];

function UserController(UserService, AuthService, $location, $rootScope) {

    var vm = this;

    vm.login = login;
    vm.registerNewUser = registerNewUser;

    vm.user = null;
    vm.isLoggedIn = false;

    initialise();

    function initialise() {
        getCurrentUser();
    }

    function login() {
        AuthService.login(vm.user)
            .then(function () {
                UserService.getUserInfo()
                    .then(function () {
                        $rootScope.$broadcast('user-logged-in');
                        $location.path('/login-success');
                    });

            });
    }

    function registerNewUser() {
        vm.user = UserService.registerNewUser(vm.user);
    }

    function getCurrentUser() {
        var currentUser = UserService.getCurrentUser();
        if (currentUser) {
            vm.user = currentUser;
            vm.isLoggedIn = true;
        }
    }

}