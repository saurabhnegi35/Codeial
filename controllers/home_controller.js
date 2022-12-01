module.exports.home = function(req, res) {
    
    return res.render('home', {
        title: "Home Page"
    });
}

// module.exports.actionNmae = function(req, res) {}