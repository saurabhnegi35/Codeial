const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    return res.render('user_profile', {
        title: "User Profile"
    });
}

// Render the Sign Up Page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codieal | Sign Up"
    });
}

// Render the Sign Up Page
module.exports.signIn = function(req, res){
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
    //TODO Later
}