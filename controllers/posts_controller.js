const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async function(req, res){
    
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr) {
            return res.status(200).json ({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success', 'Post Created Successfully');
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function (req, res){
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string 
        if(post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'Post and Associated Comments Deleted Successfully');
            return res.redirect('back');
        } else {
            req.flash('err', 'You Cannot Delete this Post');
            return res.redirect('back');
    }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
    
}
