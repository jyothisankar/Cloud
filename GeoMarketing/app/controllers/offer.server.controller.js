var mongoose = require('mongoose');
var Offer = mongoose.model("Offer");

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.create = function(req, res) {
	var offer = new Offer(req.body);
	offer.creator = req.user;
	offer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(offer);
		}
	});
};

exports.list = function(req, res) {
	console.log("long:"+req.query.long)
	console.log("lat:"+req.query.lat)
	if( req.query.long && req.query.lat){
		console.log('fetching local offers :)');
		var long= +req.query.long
		var lat= +req.query.lat
		var loc=[long,lat]
		Offer.find({loc:{$near:{$geometry:{type:"point",coordinates:loc},$maxDistance:5000}}},function(err,data){
			if (err)
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			else
			{
				console.log(data)
				res.json(data);
			}
		});
	}
	else{
		console.log("fetching all offers")
		Offer.find().populate('creator', 'firstName lastName fullName').exec(function(err, offers) {
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(offers);
			}
		});
	}
	
};


exports.update = function(req, res) {
	console.log("updating database...")
	var offer = req.offer;
	offer.title = req.body.title;
	offer.desc = req.body.desc;
	offer.start_time = req.body.start_time;
	offer.end_time = req.body.end_time;
	offer.start_discount = req.body.start_discount;
	offer.max_discount = req.body.max_discount;
	offer.like_incrementor = req.body.like_incrementor;
	offer.discount_rate = req.body.discount_rate;
	offer.Quantity_Remaining = req.body.Quantity_Remaining;
	offer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(offer);
		}
	});
};

exports.delete = function(req, res) {
	var offer = req.offer;
	offer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(offer);
		}
	});
};

exports.offerByID = function(req, res, next, id) {
	Offer.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, offer) {
		if (err) return next(err);
		if (!offer) return next(new Error('Failed to load offer '+ id));
		req.offer = offer;
		next();
	});
};

exports.read = function(req, res) {
res.json(req.offer);
};

exports.hasAuthorization = function(req, res, next) {
	if (req.offer.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
