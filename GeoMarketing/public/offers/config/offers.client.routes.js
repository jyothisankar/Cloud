angular.module('offers').config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/offers', {
			templateUrl: 'offers/views/list-offers.client.view.html'
		}).
		when('/offers/create', {
			templateUrl: 'offers/views/create-offer.client.view.html'
		}).
		when('/offers/:offerId', {
			templateUrl: 'offers/views/view-offer.client.view.html'
		}).
		when('/offers/:offerId/edit', {
			templateUrl: 'offers/views/edit-offer.client.view.html'
		}).
		when('/local', {
			templateUrl: 'offers/views/consumer-local-offers.client.view.html'
		}).
		when('/location', {
			templateUrl: 'offers/views/consumer-location.client.view.html'
		});
	}
]);
