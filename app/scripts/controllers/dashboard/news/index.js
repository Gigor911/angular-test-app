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