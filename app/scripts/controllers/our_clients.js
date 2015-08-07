speroteck.controller('OurClientsController', ['$scope', '$http', function ($scope, $http) {
    $scope.our_clients = [];
    $http.get('/clients').success(function(data) {
        $scope.our_clients = data;
    });
    $scope.layout = 'grid';
    $scope.layout = localStorage.getItem("layout");
    $scope.setGrid = function () {
        localStorage.setItem("layout", "grid");
        $scope.layout = localStorage.getItem("layout");
    };
    $scope.setList = function () {
        localStorage.setItem("layout", "list");
        $scope.layout = localStorage.getItem("layout");
    }
}]);