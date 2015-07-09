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