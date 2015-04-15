//var config = require('./config')
var mongoose = require('mongoose');

module.exports = function() {
	uri = 'mongodb://localhost/mean-book'
	var db = mongoose.connect(uri);
	require('../app/models/user.server.model');
	require('../app/models/offer.server.model');
	return db;
};
