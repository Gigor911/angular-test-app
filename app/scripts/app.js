var speroteck = angular.module('speroteck-site', ['ngRoute', 'ngAnimate']);
speroteck.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomePageController'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard/index.html',
            controller: 'AdminController',
            //noMenu: true
        }).
        when('/our-team', {
            templateUrl: 'views/ourteam.html',
            controller: 'OurTeamController'
        }).
        otherwise({
        	redirectTo: '/'
      	});
}]);
speroteck.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.noMenu = $location.path() === '/dashboard';
    });
}]);
