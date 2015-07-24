var speroteck = angular.module('speroteck-site', ['ngRoute']);
speroteck.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomePageController'
        }).
        when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        }).
        otherwise({
        	tredirectTo: '/'
      	});
}]);
