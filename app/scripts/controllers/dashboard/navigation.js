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