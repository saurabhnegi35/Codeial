const Post = require('../models/post');
const User = require('../models/user');
const friendship = require('../models/friendship');



module.exports.home = async function(req, res){

    try{
        //Change :: populate the Likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
    
        let user = await User.find({});

        let signInUserFriends;
        if(req.user){
         signInUserFriends = await User.findById(req.user._id)
         .populate('friendship', 'name email avatar');
        }

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: user,
            all_friends : signInUserFriends
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
