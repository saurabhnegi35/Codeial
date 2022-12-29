const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
function(req, email, password, done){
    // Find a User and Establish the Identity
    User.findOne({email: email}, function(err, user)  {
        if (err){
            req.flash('error', err);
            return done(err);
        }

        if (!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    });
}


));



//Serializing the User to Decide which key is to be kept in the cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
});


// Deserializing the User from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//Check if the user is Authenticated

passport.checkAuthentication = function(req, res, next) {
    //If the user is signed in, then pass on the request to next function(Controller's Action)
    if (req.isAuthenticated()) {
            return next();
        }
    //If the user is not signed in
   return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {

    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views 
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;