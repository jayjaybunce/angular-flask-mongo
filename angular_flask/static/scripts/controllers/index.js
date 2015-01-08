app.controller("IndexController",[
	"$scope",
	"$rootScope",
	"$location",
	"$window",
	"$interval",
	"$timeout",
	function($scope,$rootScope,$location,$window,$interval,$timeout) {
		$scope.chat={};
		
		$scope.submitMessage=function(){
			console.log($scope.message);
			var msg={"text"; $scope.message."time";Date.now()};
			$scope.chat.push(msg);
		}
	
}]);