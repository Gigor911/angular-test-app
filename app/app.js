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

speroteck.controller('MenuController', ['$scope', function($scope) {
    $('.cd-3d-nav-trigger').on('click', function(){
        toggle3dBlock(!$('.cd-header').hasClass('nav-is-visible'));
    });

    //select a new item from the 3d navigation
    $('.cd-3d-nav').on('click', 'a', function(){
        var selected = $(this);
        selected.parent('li').addClass('cd-selected').siblings('li').removeClass('cd-selected');
        updateSelectedNav('close');
    });

    $(window).on('resize', function(){
        window.requestAnimationFrame(updateSelectedNav);
    });

    function toggle3dBlock(addOrRemove) {
        if(typeof(addOrRemove)==='undefined') addOrRemove = true;
        $('.cd-header').toggleClass('nav-is-visible', addOrRemove);
        $('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
        $('main').toggleClass('nav-is-visible', addOrRemove).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            //fix marker position when opening the menu (after a window resize)
            addOrRemove && updateSelectedNav();
        });
    }

    //this function update the .cd-marker position
    function updateSelectedNav(type) {
        var selectedItem = $('.cd-selected'),
            leftPosition = selectedItem.offset().left,
            marker = $('.cd-marker');

        marker.css({
            'left': leftPosition,
        });
        if( type == 'close') {
            marker.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                toggle3dBlock(false);
            });
        }
    }

    $.fn.removeClassPrefix = function(prefix) {
        this.each(function(i, el) {
            var classes = el.className.split(" ").filter(function(c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });
            el.className = $.trim(classes.join(" "));
        });
        return this;
    };

}]);
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
speroteck.controller('MainController', ['$scope', function($scope) {
    $scope.seo = {
        pageTitle : '',
        pageMetaDescription : '',
    };
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
        templateUrl: 'views/partials/header.html',
        controller: 'MenuController',
    };
});
speroteck.directive('siteFooter', function () {
    return {
        // controller: function($scope, $element, $attrs, $transclude) {},
        restrict: 'E',
        templateUrl: 'views/partials/footer.html',
    };
});
speroteck.controller('AdminController', ['$scope', '$http', function($scope,$http) {
	$scope = [];
}]);
speroteck.controller('NavigationController', ['$scope', '$http','$element', function($scope,$http,$element) {
	// console.log($($element).children('li').length)
}]);
speroteck.controller('ourTeamDashController', ['$scope', '$http', function($scope,$http) {
	// Get data from server and create table with team members ===========================================
	$scope.team = [];
    $http.get('/team').success(function(data) {
        $scope.team = data;
    });

    // File uploading fucntion ===========================================
    $scope.uploadFile = function() {
	    var form = document.getElementById("new_team_form");
		var data = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/new_team', true);
		xhr.send(data);

		xhr.onload = function() {
	        if (this.responseText === "ok") {
	        	// Notification ===========================================
	            alert("team member was created succesfully")
	            // Get new data from server and put to scope ===========================================
	            $http.get('/team').success(function(data) {
			        $scope.team = data;
			    });
	        } else{
	        	// Notification ===========================================
	           	alert(this.responseText);
	        }
	    }
	};
	$scope.$apply;
}]);