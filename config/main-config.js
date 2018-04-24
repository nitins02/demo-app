(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function(app, express) {

    // *** view engine *** //
    app.set('view engine', 'html');

    

	  // *** cross domain requests *** //
    const allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	    // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, access_token');
      next();
    };

    app.use(allowCrossDomain);
    app.use(cookieParser());
	  app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  };
})(module.exports);
