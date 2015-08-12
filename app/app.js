var speroteck = angular.module('speroteckSite', ['ngRoute', 'ngAnimate']);
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
        when('/our-clients', {
            templateUrl: 'views/our_clients/index.html',
            controller: 'OurClientsController'
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
speroteck.controller('NewsController', ['$scope', '$http', function($scope, $http) {
    $scope.$parent.seo = {
        pageTitle : 'News',
        pageMetaDescription : 'Test SEO :)',
    }
    $scope.news_pool = [];
    $http.get('/news').success(function(data) {
        $scope.news_pool = data;
    });
    if (!localStorage.getItem("layout")) {
        localStorage.setItem("layout", "grid");
    }
    $scope.layout = localStorage.getItem("layout");
    $scope.setGrid = function () {
        localStorage.setItem("layout", "grid");
        $scope.layout = localStorage.getItem("layout");
    };
    $scope.setList = function () {
        localStorage.setItem("layout", "list");
        $scope.layout = localStorage.getItem("layout");
    }
}]);
speroteck.controller('NewsDetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.news = [];
    $scope.news_id = $routeParams.news_id;
    $http.get('/news/' + $scope.news_id).success(function(data) {
        $scope.news = data;
    });
}]);

speroteck.controller('OurClientsController', ['$scope', '$http', function ($scope, $http) {
    $scope.our_clients = [];
    $http.get('/clients').success(function(data) {
        $scope.our_clients = data;
    });
    if (!localStorage.getItem("layout")) {
        localStorage.setItem("layout", "grid");
    }
    $scope.layout = localStorage.getItem("layout");
    $scope.setGrid = function () {
        localStorage.setItem("layout", "grid");
        $scope.layout = localStorage.getItem("layout");
    };
    $scope.setList = function () {
        localStorage.setItem("layout", "list");
        $scope.layout = localStorage.getItem("layout");
    }
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
speroteck.controller('ParallaxController', function() {
        //check media query
        var mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, ""),
        //define store some initial variables
            halfWindowH = jQuery(window).height()*0.5,
            halfWindowW = jQuery(window).width()*0.5,
        //define a max rotation value (X and Y axises)
            maxRotationY = 5,
            maxRotationX = 3,
            aspectRatio;

        //detect if hero <img> has been loaded and evaluate its aspect-ratio
        jQuery('.cd-floating-background').find('img').eq(0).load(function() {
            aspectRatio = jQuery(this).width()/jQuery(this).height();
            if( mediaQuery == 'web' && jQuery('html').hasClass('preserve-3d') ) initBackground();
        }).each(function() {
            //check if image was previously load - if yes, trigger load event
            if(this.complete) jQuery(this).load();
        });

        //detect mouse movement
        jQuery('.cd-background-wrapper').on('mousemove', function(event){
            if( mediaQuery == 'web' && jQuery('html').hasClass('preserve-3d') ) {
                window.requestAnimationFrame(function(){
                    moveBackground(event);
                });
            }
        });

        //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
        jQuery(window).on('resize', function(){
            mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
            if( mediaQuery == 'web' && jQuery('html').hasClass('preserve-3d') ) {
                window.requestAnimationFrame(function(){
                    halfWindowH = jQuery(window).height()*0.5,
                        halfWindowW = jQuery(window).width()*0.5;
                    initBackground();
                });
            } else {
                jQuery('.cd-background-wrapper').attr('style', '');
                jQuery('.cd-floating-background').attr('style', '').removeClass('is-absolute');
            }
        });

        function initBackground() {
            var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio),
                proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
                newImageWidth = Math.ceil(halfWindowW*2*proportions),
                newImageHeight = Math.ceil(newImageWidth/aspectRatio),
                newLeft = halfWindowW - newImageWidth/2,
                newTop = (wrapperHeight - newImageHeight)/2;

            //set an height for the .cd-background-wrapper
            jQuery('.cd-background-wrapper').css({
                'height' : wrapperHeight,
            });
            //set dimentions and position of the .cd-background-wrapper
            jQuery('.cd-floating-background').addClass('is-absolute').css({
                'left' : newLeft,
                'top' : newTop,
                'width' : newImageWidth,
            });
        }

        function moveBackground(event) {
            var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
                rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

            if( rotateY > maxRotationY) rotateY = maxRotationY;
            if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
            if( rotateX > maxRotationX) rotateX = maxRotationX;
            if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

            jQuery('.cd-floating-background').css({
                '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            });
        }

    (function getPerspective(){
        var element = document.createElement('p'),
            html = document.getElementsByTagName('html')[0],
            body = document.getElementsByTagName('body')[0],
            propertys = {
                'webkitTransformStyle':'-webkit-transform-style',
                'MozTransformStyle':'-moz-transform-style',
                'msTransformStyle':'-ms-transform-style',
                'transformStyle':'transform-style'
            };

        body.insertBefore(element, null);

        for (var i in propertys) {
            if (element.style[i] !== undefined) {
                element.style[i] = "preserve-3d";
            }
        }

        var st = window.getComputedStyle(element, null),
            transform = st.getPropertyValue("-webkit-transform-style") ||
                st.getPropertyValue("-moz-transform-style") ||
                st.getPropertyValue("-ms-transform-style") ||
                st.getPropertyValue("transform-style");

        if(transform!=='preserve-3d'){
            html.className += ' no-preserve-3d';
        } else {
            html.className += ' preserve-3d';
        }
        document.body.removeChild(element);

    })();
});
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
speroteck.service('layoutToggle', function() {
    this.preSet = function() {
        if (!localStorage.getItem("layout")) {
            localStorage.setItem("layout", "grid");
        }
    };
    this.setGrid = function() {
        localStorage.setItem("layout", "grid");
        var layout = localStorage.getItem("layout");
        return layout;
    };
    this.setList = function() {
        localStorage.setItem("layout", "list");
        var layout = localStorage.getItem("layout");
        return layout;
    }
});
speroteck.controller('AdminController', ['$scope', '$http', function($scope,$http) {
	$scope = [];
	$(document).on('click', '.pg_admin .nav-tabs li', function(event) {
		$(this).addClass('active').siblings('li').removeClass('active');
		var linkToContent = $(this).attr('data-link');
		$('#' + linkToContent).addClass('active').siblings('div').removeClass('active');
	});
}]);
speroteck.controller('NavigationController', ['$scope', '$http','$element', function($scope,$http,$element) {
	// console.log(jQuery($element).children('li').length)
    /* Toggle off-canvas menu */
    jQuery('.toggle-nav').click(function() {
        if (jQuery('.pg_admin').hasClass('show-nav')) {
            // Do things on Nav Close
            jQuery('.pg_admin').removeClass('show-nav');
        } else {
            // Do things on Nav Open
            jQuery('.pg_admin').addClass('show-nav');
        }
    });
}]);
speroteck.controller('newsDashController', ['$scope', '$http', function($scope,$http) {
	// Get data from server and create table with team members ===========================================
	$scope.news = [];

    $http.get('/news').success(function(data) {
        $scope.news = data;
    });

    // Form post function ===========================================
    $scope.postForm = function() {
	    var form = document.getElementById("new_news_form");
		var data = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/new_news', true);
		xhr.send(data);

		xhr.onload = function() {
	        if (this.responseText === "ok") {
	        	// Notification ===========================================
	            alert("news was created succesfully")
	            // Get new data from server and put to scope ===========================================
	            $http.get('/news').success(function(data) {
			        $scope.news = data;
			    });
	        } else{
	        	// Notification ===========================================
	           	alert(this.responseText);
	        }
	    }
	};
	$scope.$apply;
}]);
speroteck.controller('ourClientsDashController', ['$scope', '$http', function($scope,$http) {
	// Get data from server and create table with team members ===========================================
	$scope.team = [];
    $http.get('/clients').success(function(data) {
        $scope.clients = data;
    });

    // Form post function ===========================================
    $scope.postForm = function() {
	    var form = document.getElementById("new_client_form");
		var data = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/new_clients', true);
		xhr.send(data);

		xhr.onload = function() {
	        if (this.responseText === "ok") {
	        	// Notification ===========================================
	            alert("client was created succesfully")
	            // Get new data from server and put to scope ===========================================
	            $http.get('/clients').success(function(data) {
			        $scope.clients = data;
			    });
	        } else{
	        	// Notification ===========================================
	           	alert(this.responseText);
	        }
	    }
	};
	$scope.$apply;
}]);
speroteck.controller('ourTeamDashController', ['$scope', '$http', function($scope,$http) {
	// Get data from server and create table with team members ===========================================
	$scope.team = [];
    $http.get('/team').success(function(data) {
        $scope.team = data;
    });

    // Form post function ===========================================
    $scope.postForm = function() {
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