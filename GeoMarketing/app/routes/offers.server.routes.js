var users = require('../../app/controllers/user.server.controller');
var offers = require('../../app/controllers/offer.server.controller');

module.exports = function(app) {
	app.route('/api/offers')
		.get(offers.list)
		.post(users.requiresLogin, offers.create);
	app.route('/api/offers/:offerId')
		.get(offers.read)
		.put(users.requiresLogin, offers.hasAuthorization, offers.update)
		.delete(users.requiresLogin, offers.hasAuthorization, offers.delete);
		app.param('offerId', offers.offerByID);
};
