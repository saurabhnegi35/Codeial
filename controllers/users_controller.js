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