/* global angular */
"use strict";

/* AngularJS Module */
angular.module("intersect", [
	'ngRoute',
	'ngResource',
]);

app.config([
	'$routeProvider', 
	'$locationProvider',
	
	function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/chat', {
			templateUrl: 'static/views/partials/chat.html',
			controller: "IndexController"
		})
		.otherwise({
			redirectTo: '/'
		})
		;
	}]);


app.run([
  "$rootScope",
  "$http",
  "$location",
  "$interval",
  "$timeout",
  function($rootScope, $http, $location, $interval, $timeout){

  }
]);