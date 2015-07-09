var speroteck = angular.module('speroteck-site', ['ngRoute']);
speroteck.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'app/views/home.html'
		});
}]);