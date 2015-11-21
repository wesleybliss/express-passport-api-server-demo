
var LocalStrategy = require('passport-local'),
    User          = require('../models/user')
;

module.exports = functionn( passport ) {

    passport.serializeUser( function( user, next ) {
        next( null, user.id );
    });

    passport.deserializeUser( function( id, next ) {
        User.findById( id, function( err, user ) {
            next( err, user );
        });
    });

    /**
     * Local signup
     */
    passport.use( 'local-signup', new LocalStrategy({
        usernameField:    'email',
        passwordField:    'password',
        passReqToCallback: true
    }, function( req, email, password, next ) {

        process.nextTick( function() {

            User.findOne(
                {
                    'local.email': email
                },
                function( err, user ) {

                    if ( err ) return next( err );

                    if ( user ) {
                        return next( null, false, 'User already exists' );
                    }

                    user = new User();
                    user.local.email = email;
                    user.local.password = user.generateHash( password );

                    user.save( function( err ) {
                        if ( err ) throw err;
                        return next( null, user );
                    });

                }
            );

        });

    });

};
