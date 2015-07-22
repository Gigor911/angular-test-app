speroteck.controller('MainController', ['$scope', function($scope) {
    $scope.seo = {
        pageTitle : '',
        pageMetaDescription : '',
    }
}]);
speroteck.controller('HomePageController', ['$scope', function($scope) {
    $scope.$parent.seo = {
        pageTitle : 'Home Page',
        pageMetaDescription : 'Test SEO :)',
    }
}]);