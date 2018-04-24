(function (errorConfig) {

  'use strict';

  // *** error handling *** //

  errorConfig.init = function (app) {

    // development error handler (will print stacktrace)
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
          message: err.message,
          error: err
        });
      });
    }

    // production error handler (no stacktraces leaked to user)
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).json({
        message: err.message,
        error: {}
      });
    });

  };

})(module.exports);
