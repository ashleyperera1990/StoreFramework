angular
    .module('StoreFramework')

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })
    .constant('API_ENDPOINT', {
        url: 'http://localhost:4001/'
    });