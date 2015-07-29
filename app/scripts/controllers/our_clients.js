speroteck.controller('OurClientsController', ['$scope', '$http', function ($scope, $http) {
    $scope.our_clients = [];
    $http.get('/clients').success(function(data) {
        $scope.our_clients = data;
    });
    
    $scope.layout = 'list';
}]);