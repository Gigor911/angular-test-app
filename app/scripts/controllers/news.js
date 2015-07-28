speroteck.controller('NewsController', ['$scope', '$http', function($scope, $http) {
    $scope.news_pool = [];
    $http.get('/news').success(function(data) {
        $scope.news_pool = data;
    });
    $scope.layout = 'list';
}]);