const {Comment,Post} = require("../models");

module.exports.createPost = async function(req,res){
    try {
        let post = Post.create({content:req.body.content,user:req.user._id});
        console.log(`creted post is ${post}`);
        return res.redirect('/');
    } catch(err) {
        console.log("ERRor", err);
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            console.log("here some thisn");
            await Comment.deleteMany({post:req.params.id});            
        }
        return res.redirect('back');
        
    } catch (err) {
        return res.redirect('back');
    }
    
}