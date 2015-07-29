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
        when('/news', {
            templateUrl: 'views/news/index.html',
            controller: 'NewsController'
        }).
        when('/news/:news_id', {
            templateUrl: 'views/news/news_details.html',
            controller: 'NewsDetailsController'
        }).
        otherwise({
        	redirectTo: '/'
      	});
}]);

/* Used to hide menu and footer for admin panel  */
speroteck.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.noMenu = $location.path() === '/dashboard';
    });
}]);
