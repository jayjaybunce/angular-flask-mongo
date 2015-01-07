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
		.when('/', {
			templateUrl: 'static/partials/start.html',
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
  "OrderService",
  function($rootScope, $http, $location, $interval, $timeout, OrderService){

  }
]);