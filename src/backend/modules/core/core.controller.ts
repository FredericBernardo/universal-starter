var validator = require('validator');

export const CoreController = {

  /**
   * Render the main application page
   */
  renderIndex(req, res) {
    var safeUserObject = null;
    if (req.user) {
      res.user = {
        displayName: validator.escape(req.user.displayName),
        provider: validator.escape(req.user.provider),
        username: validator.escape(req.user.username),
        created: req.user.created.toString(),
        roles: req.user.roles,
        profileImageURL: req.user.profileImageURL,
        email: validator.escape(req.user.email),
        lastName: validator.escape(req.user.lastName),
        firstName: validator.escape(req.user.firstName),
        additionalProvidersData: req.user.additionalProvidersData
      };
    }

    res.render('../modules/core/views/layout', {
      req,
      res,
      // time: true, // use this to determine what part of your app is slow only in development
      preboot: false,
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: 'http://localhost:3000',      // time: true, // use this to determine what part of your app is slow only in development
      sharedConfig: 'TODO'//TODO JSON.stringify(config.shared)
    });
  },

  /**
   * Render the server error page
   */
    renderServerError(req, res) {
    res.status(500).render('../modules/core/views/500', {
      res,
      req,
      preboot: false,
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: 'http://localhost:3000',      // time: true, // use this to determine what part of your app is slow only in development
      error: 'Oops! Something went wrong...'
    });
  },

  /**
   * Render the server not found responses
   * Performs content-negotiation on the Accept HTTP header
   */
    renderNotFound(req, res) {
    res.status(404).format({
      'text/html': function () {
        res.render('../modules/core/views/404', {
          res,
          req,
          preboot: false,
          baseUrl: '/',
          requestUrl: req.originalUrl,
          originUrl: 'http://localhost:3000',      // time: true, // use this to determine what part of your app is slow only in development
          url: req.originalUrl
        });
      },
      'application/json': function () {
        res.json({
          error: 'Path not found'
        });
      },
      'default': function () {
        res.send('Path not found');
      }
    });
  }
};
