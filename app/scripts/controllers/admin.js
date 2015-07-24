speroteck.controller('AdminController', ['$scope', '$http', function($scope,$http) {
    $scope.uploadFile = function() {
	    var form = document.getElementById("new_team_form");
		var data = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/new_team', true);

		xhr.send(data);

		xhr.onload = function() {

	        if (this.responseText === "ok") {
	            alert("team member was created succesfully")
	        } else{
	           alert(this.responseText);
	        }
	    }
	};
}]);