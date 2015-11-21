
var passport = require('passport');

var SignupRoute = function(){};

SignupRoute.prototype = new (require('./index'));
SignupRoute.prototype.constructor = SignupRoute;

SignupRoute.prototype.signup = function( req, res ) {

    passport.authenticate( 'local-signup' );

};
