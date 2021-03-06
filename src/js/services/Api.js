app.factory('Api', ['$resource', function($resource){
    return {
        Device: $resource('/api/devices/:id', {id: '@id'}),
        Product: $resource('/api/products/:id', {id: '@id'}),
        Setting: $resource('/api/settings/:id', {id: '@id'}),
        Location: $resource('/api/locations/:id', {id: '@id'}),
        //User: $resource('/api/deviceusers/:id', {id: '@id'}),
        User: $resource('/api/users/:id', {id: '@id'}),
        Server: $resource('/api/servers/:id', {id: '@id'}),
        Message: $resource('/api/messages/:id',{id: '@id'}),
        Transaction: $resource('/api/transaction/:id',{id: '@id'})
    }
}]);