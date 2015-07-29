speroteck.controller('NewsDetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.news = [];
    $scope.news_id = $routeParams.news_id;
    $http.get('/news/' + $scope.news_id).success(function(data) {
        $scope.news = data;
    });
}]);
