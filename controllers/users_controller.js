const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    })
    
}

// Render the Sign Up Page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codieal | Sign Up"
    });
}

// Render the Sign In Page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in', {
        title: "Codieal | Sign In"
    });
}

// Get the SignUp Data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

// SignIn and Create the session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    
    //Since version 0.6.0 major change is that that req.logout()
    // is now an asynchronous function, whereas previously it was synchronous. 
    //For instance, a logout route that was previously:
    
    // req.logout();

    //but afterwards req.logout is
    req.logout(function(err) {
        if (err) { return next(err); }

        return res.redirect('/');
})
}