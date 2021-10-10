const {Friendship,User,Request} = require('../models');

module.exports.sendRequest = async function(req,res){
    let requestSend = false;
    try {
        console.log("finding users",req.params.id,req.user.id);
        const user = await User.findById(req.params.id);
        const self = await User.findById(req.user.id);
        const request = await Request.create({
            from:req.user.id,
            to:req.params.id
        });
        user.request.push(request.id);
        self.request.push(request.id);
        user.save();
        self.save();
        if(req.xhr){
            return res.status(200).json({
                requestSend:true,
            })
        }
        return res.redirect("back");
           
    } catch (err) {
        console.log("technincal issue server side during sending request",err);
        if(req.xhr){
            return res.status(500).json({
                message:"technincal issue server side",
                requestSend:false,
            })
        }
        return res.redirect("back");
    }
}

module.exports.confirmRequest = async function(req,res){
    try {
        const request = await Request.findById(req.params.id);
        const friendship = await Friendship.create({
            to:request.to,
            from:request.from
        });
        const friend = await User.findByIdAndUpdate(
            request.from===req.user.id?request.to:request.from,
            {$pull:{"request":request.id},$push:{"friends":friendship.id}});
        const self = await User.findByIdAndUpdate(req.user.id,
            {$pull:{"request":request.id},$push:{"friends":friendship.id}});
        await Request.findByIdAndRemove(req.params.id);
        if(req.xhr){
            return res.status(200).json({
                friendshipDone:true,
            })
        }
        return res.redirect("back");        
    } catch (err) {
        console.log("technincal issue server side during sending request",err);
        if(req.xhr){
            return res.status(500).json({
                message:"technincal issue server side",
                friendshipDone:false,
            })
        }
        return res.redirect("back");
    }
}

module.exports.deleteFriend = async function(req,res){
    try {
        const friendship = await Friendship.findById(req.params.id);
        const friend = await User.findByIdAndUpdate(
            friendship.from.toString()===req.user.id?friendship.to:friendship.from,
            {$pull:{"friends":friendship.id}});
        const self = await User.findByIdAndUpdate(
            req.user.id,
            {$pull:{"friends":friendship.id}});
        await Friendship.findByIdAndRemove(friendship.id);

        if(req.xhr){
            return res.status(200).json({
                confirmed:true,
            })
        }
        req.flash('success','friend is removed')
        return res.redirect("back");        
    } catch (err) {
        console.log("technincal issue server side during sending request",err);
        if(req.xhr){
            return res.status(500).json({
                message:"technincal issue server side",
                confirmed:false,
            })
        }
        req.flash('error','technical issue')
        return res.redirect("back");
    }
}

module.exports.deleteRequest = async function(req,res){
    try {
        const request = await Request.findById(req.params.id);
        // console.log(request,"this      ",req.user.id,request.to.toString()===req.user.id,request.from.toString()===req.user.id);
        // console.log(request.from===req.user.id,request.from==req.user.id,request.to===req.user.id,request.to===req.user.id)
        const friend = await User.findByIdAndUpdate(
            request.from.toString()===req.user.id?request.to:request.from,
            {$pull:{"request":request.id}});
        const self = await User.findByIdAndUpdate(
            req.user.id,
            {$pull:{"request":request.id}});
        await Request.findByIdAndRemove(request.id);

        if(req.xhr){
            return res.status(200).json({
                confirmed:true,
            })
        }
        req.flash('success','friend is unrequested')
        return res.redirect("back");        
    } catch (err) {
        console.log("technincal issue server side during sending request",err);
        if(req.xhr){
            return res.status(500).json({
                message:"technincal issue server side",
                confirmed:false,
            })
        }
        req.flash('error','technical issue')
        return res.redirect("back");
    }
}