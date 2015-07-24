speroteck.controller('OurTeamController', ['$scope', '$http', function ($scope, $http) {
    $scope.team = [];
    $http.get('/team').success(function(data) {
        $scope.team = data;
    });
    $scope.$parent.seo = {
        pageTitle : 'Our Team',
        pageMetaDescription : 'Test SEO :)'
    };
}]);