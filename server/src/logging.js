
var winston = require('winston'),
    moment  = require('moment')
;

/**
 * Wrapper class for setting up logging
 *
 * @param {Boolean} use24hrTime     (Optional) Use 24hr timestamp (defaults to false)
 * @returns {Object}                Logger instance. Use Logger#getLogger() to get logging instance
 */
var Logger = function( use24hrTime ) {
    
    use24hrTime = use24hrTime || false;
    use24hrTime = use24hrTime ? 'HH' : 'hh';
    
    // For readability
    this.timestamp = function() {
        // http://momentjs.com/docs/#/parsing/string-format/
        return '[' + moment().format( use24hrTime + ':mm:ss') + ']';
    };
    
    this.formatter = function(options) {
        // Return string will be passed to logger.
        return options.timestamp() + ' ' +
            options.level.toUpperCase() + ' ' +
            (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
    };
    
    // Allow other parts of the app to grab this
    this.transportOptions = {
        timestamp: this.timestamp,
        formatter: this.formatter,
        colorize:  true
        /*json:     true*/
    };
    
};

/**
 * Allows other scripts to re-use the default logging transport config.
 */
Logger.prototype.getDefaultTransportOptions = function() {
	return this.transportOptions;
};

/**
 * Allows other scripts to re-use the default logging transport (Console)
 */
Logger.prototype.getDefaultTransport = function() {
    return new (winston.transports.Console)( this.transportOptions );
};

/**
 * Sets up & returns an instance of the logging transport.
 * You can actually log requests with this instance.
 */
Logger.prototype.getLogger = function( transport ) {
	transport = transport || this.getDefaultTransport();
	return new (winston.Logger)({
        transports: [ transport ]
    });
};


//
module.exports = Logger;