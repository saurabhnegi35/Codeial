const passport = require("passport");
const env = require("./environment");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
// Tell Passport to use a new Strategy for Google Login
passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
    },

    function (accessToken, refreshToken, profile, done) {
      // Find a User
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in Google Strategy-Passport", err);
          return;
        }

        console.log(profile);

        if (user) {
          // If Found, set this user as req.user
          return done(null, user);
        } else {
          //If not Found, Create the User and Set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "Error in Creating User Googlr Strategy-Passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
