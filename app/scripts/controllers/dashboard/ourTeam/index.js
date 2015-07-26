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