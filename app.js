(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const path = require('path');
  const mainConfig 	= require('./config/main-config.js');
  const errorConfig = require('./config/error-config.js');

  // *** express instance *** //
  const app = express();

  // *** config *** //  
  mainConfig.init(app, express);
  errorConfig.init(app);  

  
  /*express.static is a built in middleware function to serve static files.
    We are telling express server public folder is the place to look for the static files
    */
  app.use(express.static(path.join(__dirname, 'public')));

  module.exports = app;

}());