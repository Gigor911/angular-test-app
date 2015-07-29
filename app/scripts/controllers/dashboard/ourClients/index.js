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