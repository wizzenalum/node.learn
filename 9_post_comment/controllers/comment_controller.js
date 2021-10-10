const {User,Comment,Post} = require('../models');

module.exports.createComment = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
            },function(err,comment){
                post.comment.push(comment.id);
                post.save();
                res.redirect('/');
            })
        }
    })
  
}


module.exports.destroy = function(req, res){
    console.log('int to destroy');
    Comment.findById(req.params.id,function(err,comment){
        if(err) console.log("errorr ",err);
        let postId = comment.post;
        Post.findById(postId,function(err,post){
            if(err){
                console.log("errore searching the post ",err);
                return res.redirect('back');
            }
            if(comment.user == req.user.id){
                console.log("self comment is removed");
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post){
                })
            }else if(post.user== req.user.id){
                console.log("others comment is removed");
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post){
                })
            }
        })
        
        
        return res.redirect('back');

    })
}

