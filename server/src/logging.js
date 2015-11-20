'use strict';

var winston = require('winston'),
	moment  = require('moment')
;

module.exports = (function( use24hrTime ) {
	
	use24hrTime = use24hrTime || false;
	use24hrTime = use24hrTime ? 'HH' : 'hh';
	
	// For readability
	var timestamp = function() {
		// http://momentjs.com/docs/#/parsing/string-format/
		return '[' + moment().format( use24hrTime + ':mm:ss') + ']';
	};
	
	var formatter = function(options) {
		// Return string will be passed to logger.
		return options.timestamp() + ' ' +
			options.level.toUpperCase() + ' ' +
			(undefined !== options.message ? options.message : '') +
			(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
	};
	
	return new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				timestamp: timestamp,
			    formatter: formatter
			})
		]
	});
	
})();