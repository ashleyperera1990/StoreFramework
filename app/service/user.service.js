angular
    .module('StoreFramework')
    .service('UserService', UserService);

UserService.$inject = ['$http', '$q'];

function UserService($http, $q) {

    var user = {};

    var userService = {
        getUserInfo: getUserInfo,
        isLoggedIn: isLoggedIn,
        getCurrentUser: getCurrentUser,
        registerNewUser: registerNewUser
    };

    return userService;

    // -------- Methods ----------- //

    function getCurrentUser() {
        return user;
    }

    function isLoggedIn() {
        var result = false;
        if (user._id) {
            result = true;
        }
        return result;
    }

    function getUserInfo() {
        var deferred = $q.defer();

        $http.get('http://localhost:4001/getUserInfo')
            .then(function (res) {
                user = res.data.user.details;
                user._id = res.data.user._id;
                deferred.resolve(res.data.user.details);
            });
        return deferred.promise;
    }


    function registerNewUser(user) {
        $http.post('http://localhost:4001/signUp', user)
            .then(function (data) {
                user = data;
                return user;
            });
    }
}