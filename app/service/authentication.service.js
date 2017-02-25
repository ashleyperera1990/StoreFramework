angular
    .module('StoreFramework')
    .service('AuthService', AuthService);

AuthService.$inject = ['$q', '$http', 'API_ENDPOINT'];

function AuthService($q, $http, API_ENDPOINT) {

    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    var authService = {

        login: login,
        register: register,
        logout: logout,
        isLoggedIn: isLoggedIn,
        isAuthenticated: function () {
            return isAuthenticated;
        }
    };


    loadUserCredentials();

    return authService;

    function isLoggedIn() {
        return isAuthenticated;
    }

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    function register(user) {
        return $q(function (resolve, reject) {
            $http.post(API_ENDPOINT.url + 'signUp', user).then(function (result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    }

    function login(user) {
        var deferred = $q.defer();
        $http.post(API_ENDPOINT.url + 'authenticate', user).then(function (result) {
            if (result.data.success) {
                storeUserCredentials(result.data.token);
                deferred.resolve(result.data.msg);
            } else {
                deferred.reject(result.data.msg);
            }
        });
        return deferred.promise;

    }

    function logout() {
        destroyUserCredentials();
    }

}