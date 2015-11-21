
var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs')
;

var userSchema = mongoose.Schema({

    token:              String,
    tokenExpiration:    Date,

    local: {
        email:      String,
        password:   String
    }

});

userSchema.methods.generateHash = function( password ) {
    return bcrypt.hashSync( password, bcrypt.genSalt(8), null );
};

userSchema.methods.validPassword = function( password ) {
    return bcrypt.compareSync( password, this.local.password );
};


//
module.exports = mongoose.model( 'User', userSchema );
