speroteck.controller('NewsController', ['$scope', '$http', function($scope, $http) {
    $scope.$parent.seo = {
        pageTitle : 'News',
        pageMetaDescription : 'Test SEO :)',
    }
    $scope.news_pool = [];
    $http.get('/news').success(function(data) {
        $scope.news_pool = data;
    });
    if (!localStorage.getItem("layout")) {
        localStorage.setItem("layout", "grid");
    }
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