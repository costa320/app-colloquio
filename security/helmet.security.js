const csp = require("helmet-csp");
module.exports = csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: [
      "'self'",
      "fonts.com",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com"
    ],
    imgSrc: ["'self'", "data:", "*"],
    sandbox: ["allow-forms", "allow-same-origin", "allow-scripts"],
    reportUri: "/report-violation",
    objectSrc: ["'none'"],
    childSrc: ["*"],
    connectSrc: ["'self'", "https://dev-costa.eu.auth0.com"],
    upgradeInsecureRequests: true,
    workerSrc: false // This is not set.
  },

  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,

  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true
});
