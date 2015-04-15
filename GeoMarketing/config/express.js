var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

module.exports = function() {
	var app = express();
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());
	
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'developmentSessionSecret'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
		
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/offers.server.routes.js')(app);
	
	app.use(express.static('./public'));
	return app;
};
