
var log = (new (require('../logging'))).getLogger();


var AppRoute = function(){};

/**
 * Generic base method to send data back to the client
 *
 * @param {String|Object} err       Error message (usually just passed from a subroutine result)
 * @param {Object|Resource} res     Restify/HTTP resource object (server generated)
 * @param {Number} code             App-specific code for developer usage
 * @param {Number} httpCode         HTTP status code (200, 400, etc.)
 */
AppRoute.prototype.send = function( err, res, code, httpCode, data ) {
    err && log.error( err );
    res.status( httpCode )
        .send({
            code: ( code || 0 ),
            error: err,
            data: data
        }
    );
};

/**
 * Wrapper for send() success messages
 *
 * @param {Object} res
 * @param {Object} data     Payload to send, if any
 * @param {Number} code     Internal code (optional)
 */
AppRoute.prototype.sendSuccess = function( res, data, code ) {
    this.send( null, res, code, 200, data );
};

/**
 * Wrapper for send() error messages
 *
 * @param {Object} res
 * @param {Object} err      Error object/message
 * @param {Number} code     Internal code (optional)
 */
AppRoute.prototype.sendError = function( res, err, code ) {
    this.send( err, res, code, 400, null );
};

AppRoute.prototype.index = function( req, res ) {
    this.sendSuccess( res, {
        noop: 'Nothing here...'
    });
};


//
module.exports = AppRoute;