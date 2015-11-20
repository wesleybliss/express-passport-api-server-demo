
var log = (new (require('../logging'))).getLogger();


var ThingsRoute = function(){};

// Inherit from the AppRoute class, but reset the controller to use this class's.
ThingsRoute.prototype = new (require('./index'));
ThingsRoute.prototype.constructor = ThingsRoute;


ThingsRoute.prototype.list = function( req, res ) {
    
    // @todo These will eventually be models, but for an example:
    var sampleThings = [
        { name: 'Thing 1', color: 'blue' },
        { name: 'Thing 2', color: 'red' },
        { name: 'Thing 1', color: 'yellow' },
        { name: 'Thing 1', color: 'pink' },
        { name: 'Thing 1', color: 'black' }
    ];
    
    // "this" can now access methods in the parent AppRoute class.
    this.sendSuccess( res, {
        things: sampleThings
    });
    
};


//
module.exports = ThingsRoute;