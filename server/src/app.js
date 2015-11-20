
var config         = require('./config'),
    express        = require('express'),
    logger         = new (require('./logging'))(),
    log            = logger.getLogger(),
    expressWinston = require('express-winston')
;

// Log levels { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

var app = express();
app.locals.title = 'Express Passport Demo';

// Middleware

var transportOptions = logger.getDefaultTransportOptions();
transportOptions.json = true;

// Log all requests
if ( config.logging.requests ) {
    app.use(expressWinston.logger({
        transports: [new (require('winston')).transports.Console( transportOptions )],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
        colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));
}

// Load routes
// @todo Simple routes for now, but this should be abstracted to a middleware later
var routes = {};
routes.default = new (require('./routes/index'))();

// Hook up routes
app.get( '/', routes.default.index.bind( routes.default ) );


// Start the server
var server = app.listen( 8080, function() {
    
    log.info(
        '\n\n//\n// ' + app.locals.title + '\n//' +
        ' Listening at http://%s:%s\n//\n',
        server.address().address,
        server.address().port
    );
    
});