module.exports = {
    settings: {
      contentSecurityPolicy: {
        directives: {
          "connect-src": ["'self'", "http:", "https:", "ws:", "http://localhost:1338", "http://localhost:1338"],
        },
      },
    },
  };
  