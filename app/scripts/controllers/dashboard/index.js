speroteck.controller('AdminController', ['$scope', '$http', function($scope,$http) {
	$scope = [];
	$(document).on('click', '.pg_admin .nav-tabs li', function(event) {
		$(this).addClass('active').siblings('li').removeClass('active');
		var linkToContent = $(this).attr('data-link');
		$('#' + linkToContent).addClass('active').siblings('div').removeClass('active');
	});
}]);