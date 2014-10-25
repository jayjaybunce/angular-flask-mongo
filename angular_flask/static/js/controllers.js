'use strict';

/* Controllers */

function IndexController($scope) {
	
}

function AboutController($scope) {
	
}

function HelpController($scope, $http) {
	$scope.success = false;
	$scope.error = false;
	$scope.send = function () {
 
	var htmlBody = '<div>Name: ' + $scope.user.name + '</div>' +
                 '<div>Email: ' + $scope.user.email + '</div>' +
                 '<div>Message: ' + $scope.user.body + '</div>' +
                 '<div>Date: ' + (new Date()).toString() + '</div>';
  
    $http({
      url: 'https://api.postmarkapp.com/email',
      method: 'POST',
      data: {
        'From': 'jerrod@exterahosting.com',
        'To': 'jerrod@exterahosting.com',
        'HtmlBody': htmlBody,
        'Subject': 'New Contact Form Submission'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token':'e6827b9c-d39a-4b24-8d58-681a336b41bb'
      }
    }).
    success(function (data) {
	    console.log(data);
    	$scope.success = true;
    	$scope.user = {};
    }).
    error(function (data) {
    	console.log(data);
    	$scope.error = true;
    });
  }
	
}

function FireAlarmController($scope) {
	
}

function FireSuppressionController($scope) {
	
}

function PostListController($scope, Post) {
	var postsQuery = Post.get({}, function(posts) {
		$scope.posts = posts.objects;
	});
}
function Post2ListController($scope, Post2) {
	var postsQuery = Post2.get({}, function(posts) {
		$scope.posts = posts.result;
	});
}
function ReadingListController($scope, Reading) {
	var readingsQuery = Reading.get({}, function(readings) {
		$scope.readings = readings.objects;
	});
}

function Post2DetailController($scope, $routeParams, Post2) {
	var postQuery = Post2.get({ postId: $routeParams.postId }, function(post) {
		console.log($routeParams.postId);
		$scope.post = post;
	});
}

function ReadingDetailController($scope, $routeParams, Reading) {
	var ReadingQuery = Reading.get({ readingId: $routeParams.readingId }, function(reading) {
		$scope.reading = reading;
	});
}
