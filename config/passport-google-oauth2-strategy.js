const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// Tell Passport to use a new Strategy for Google Login
passport.use(new googleStrategy({
    clientID: "137812945111-qkatidbnl6luj8ajoch41ukqhanbocf8.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback" 
    }, 

    function(accessToken, refreshToken, profile, done){
        // Find a User
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err) {console.log('Error in Google Strategy-Passport', err); return;}

            console.log(profile);

            if (user) {
                // If Found, set this user as req.user
                return done(null, user);
            }else{
                //If not Found, Create the User and Set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err, user) {
                    if (err) {console.log('Error in Creating User Googlr Strategy-Passport', err); return;} 

                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;
