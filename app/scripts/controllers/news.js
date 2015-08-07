speroteck.controller('NewsController', ['$scope', '$http', function($scope, $http) {
    $scope.news_pool = [];
    $http.get('/news').success(function(data) {
        $scope.news_pool = data;
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