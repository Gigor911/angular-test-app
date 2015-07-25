var speroteck = angular.module('speroteck-site', ['ngRoute', 'ngAnimate']);
speroteck.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomePageController'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard/index.html',
            controller: 'AdminController'
        }).
        when('/our-team', {
            templateUrl: 'views/ourteam.html',
            controller: 'OurTeamController'
        }).
        otherwise({
        	redirectTo: '/'
      	});
}]);
