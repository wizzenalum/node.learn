const userModel = require('../models/user');

// this is action to show the sign up page.
module.exports.signup = function(req, res){
    context= {
        title:'signup',
    }
    res.render('signup',context);
}
// handle user creation
module.exports.createUser = function(req,res){
    context = {
        title:'creting user'
    }
    if(req.body.password!== req.body.confirm_password){
        console.log("password don't match");
        return res.redirect("back");
    }
    userModel.findOne({'email':req.body.email},function(err, user){
        if(err){console.log("there is error finding  in create");return}
        if(user){ console.log("user alredy available"); return res.redirect('back');}
        else{

            const user = {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            };
            userModel.create(user,function(err,user){
                if(err){console.log("error ocur int user creation"); res.redirect('back');}
                console.log(`created USER : ${user}`);
                res.redirect('/user/signin');
            })
        }
    });
    
}


module.exports.signin = function(req, res){
    context= {
        title:'signin',
    }
    res.render('signin',context);
}


module.exports.createSession = function(req,res){
    context = {
        title:'creating-session',
    }
    console.log(req.body)
    // fint he user first 
    userModel.findOne({'email':req.body.email},function(err,user){
        if(err) {
            console.log("some error happen searching user");
            return res.redirect('back');
        }
        if(user.email!== req.body.email){
            console.log("email enterd is wrong");
            return res.redirect('back');
        }
        if(user.password !== req.body.password){
            console.log("password enterd is wrong");
            return res.redirect('back');
        }
        // handling if the user is found 
        res.cookie('user_id',user.id); // this will show on the front end.
        console.log("login user: ",user);

        return res.redirect('/user/profile');
    })
}

module.exports.signout = function(req,res){
    res.cookie('user_id',"");
    return res.redirect('/user/signin')
}

module.exports.profile = function(req,res){
    userModel.findById(req.cookies.user_id,function(err,user){
        if(err){console.log("error in profile user seaching");return res.redirect('/user/signin')}
        if(!user){
            console.log("user not found");
            return res.redirect('/user/signin');
        }
        context = {
            title:"user profile",
            user:user
        }
        console.log(user.name,"get enter to the system")
        return res.render('user-profile',context);
    })
}