angular.module('offers').controller('OffersController', ['$scope','$routeParams', '$location', 'Authentication', 'Offers',function($scope, $routeParams, $location, Authentication, Offers)
{
	$scope.authentication = Authentication;

	$scope.create = function() {
		var offer = new Offers({
			title: this.title,
			desc: this.desc,
			loc:[this.long,this.lat],
			start_time :this.start_time,
			end_time: this.end_time,
			start_discount: this.start_discount,
			max_discount: this.max_discount,
			like_incrementor: this.like_incrementor,
			discount_rate : this.discount_rate ,
			Quantity_Remaining : this.Quantity_Remaining 
		});
		offer.$save(function(response) {
			$location.path('offers/' + response._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function() {
		$scope.offers = Offers.query();
	};

	$scope.findOne = function() {
		$scope.offer = Offers.get({
			offerId: $routeParams.offerId
		});
	};

	$scope.update = function() {
		$scope.offer.$update(function() {
			$location.path('offers/' + $scope.offer._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.delete = function(offer) {
		if (offer) {
			offer.$remove(function() {
				for (var i in $scope.offers) {
					if ($scope.offers[i] === offer) {
						$scope.offers.splice(i, 1);
					}
				}
			});
		} else {
			$scope.offer.$remove(function() {
				$location.path('offers');
			});
		}
	};

	$scope.findLocation = function(){
		alert("getting location");
	};

	$scope.getLocalOffers = function(){

		Offers.getLocalOffers({long:$scope.long,lat:$scope.lat}).$promise.then(function(data){
			alert(data);
			
			$scope.offers = data;
			debugger;
		});
		//for(o in $scope.offers){alert(o);}
		
		//$location.path('local/');
	};

	$scope.loadLocalOffers = function(){
		alert("loading local offers from rest api... :)");
	};
}
]);
