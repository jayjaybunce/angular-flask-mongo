'use strict';

angular.module('AngularFlask', ['angularFlaskServices'])
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'static/partials/landing.html',
			controller: IndexController
		})
		.when('/me', {
			templateUrl: 'static/partials/about.html',
			controller: AboutController
		})
		.when('/contact-us', {
			templateUrl: 'static/partials/contact-us.html',
			controller: HelpController
		})
		.when('/fire-alarm', {
			templateUrl: 'static/partials/fire-alarm.html',
			controller: AboutController
		})
		.when('/fire-suppression', {
			templateUrl: 'static/partials/fire-suppression.html',
			controller: AboutController
		})	
		.when('/system-design', {
			templateUrl: 'static/partials/system-design.html',
			controller: AboutController
		})
		.when('/about/:pageName', {
			templateUrl: 'static/partials/landing.html',
			controller: IndexController
		})
		.when('/post2', {
			templateUrl: 'static/partials/post-list.html',
			controller: Post2ListController
		})
		.when('/post2/:postId', {
			templateUrl: '/static/partials/post-detail.html',
			controller: Post2DetailController
		})
		/* Create a "/blog" route that takes the user to the same place as "/post" */
		.when('/blog', {
			templateUrl: 'static/partials/post-list.html',
			controller: PostListController
		})
		
		/* Create a "/reading" route that takes the user to the same place as "/post" */
		.when('/reading', {
			templateUrl: 'static/partials/reading-list.html',
			controller: ReadingListController
		})
		.when('/reading/:readingId', {
			templateUrl: '/static/partials/reading-detail.html',
			controller: ReadingDetailController
		})
		.otherwise({
			redirectTo: '/'
		})
		;

		$locationProvider.html5Mode(true);
	}])
;