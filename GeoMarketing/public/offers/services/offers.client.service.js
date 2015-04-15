angular.module('offers').factory('Offers', ['$resource',function($resource) {
	return $resource('api/offers/:offerId', {
		offerId: '@_id'
	}, {
		update: {method: 'PUT'},
		getLocalOffers: {method:'GET', params :{long:'', lat:''}, isArray:true}
	});
}]);
