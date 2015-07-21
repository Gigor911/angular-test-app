var speroteck = angular.module('speroteck-site', ['ngRoute']);
speroteck.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomePageController'
        });
}]);
speroteck.controller('MainController',['$scope', function($scope) {
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
speroteck.directive('siteHeader', function () {
    return {
        // controller: function($scope, $element, $attrs, $transclude) {},
        restrict: 'E',
        templateUrl: 'app/views/partials/header.html',
    };
});
speroteck.directive('siteFooter', function () {
    return {
        // controller: function($scope, $element, $attrs, $transclude) {},
        restrict: 'E',
        templateUrl: 'app/views/partials/footer.html',
    };
});