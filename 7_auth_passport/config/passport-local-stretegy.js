const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email', // this is in user model which is unique
    passowordField:'password',
    },
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){ 
                console.log('errrorr in finding user-->passport');
                return done(err); // doneis callback function where takes two arguments 1. err  2. user authentication
            }
            if(!user) console.log("invalid user");
            if(!user|| user.password!=password){
                console.log('Invalid username/password',user,passoword,user.passoword,passoword==user.passoword);
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

// serializing the user to dicide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
});

//deserializign the user from the kdy in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> passport deserialzer');
            return done(err);
        }
        return done(null,user);
    });
});


// check if the user is authenticateed.
passport.checkauthentication = function(req,res,next){
    // if the user is signed in then pass on the request to the next function which is my controllers action
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not digned in/
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){
        // request. user conatains the current signed in user from the session cokies we have just send to the views
        res.locals.user = req.user;
    }
    next();
}
passport.isUserSignedin = function(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/user/profile');
    }
    next();
}

module.exports = passport;
