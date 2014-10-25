'use strict';

angular.module('angularFlaskServices', ['ngResource'])
	.factory('Post2', function($resource) {
		return $resource('/api/post2/:postId', {}, {
			query: {
				method: 'GET',
				params: { postId: '' },
				isArray: true
			}
		});
	})
	.factory('Reading', function($resource) {
		return $resource('/api/reading/:readingId', {}, {
			query: {
				method: 'GET',
				params: { readingId: '' },
				isArray: true
			}
		});
	})
;



