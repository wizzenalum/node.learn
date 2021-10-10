const userModel = require('../models/user');

module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25);
    userModel.find(function(err,user){
        if(err){
            console.log("there is an error to exxecceing ",err);
        }
        let context = {
            title:"home",
            users:user
        };
        // console.log(user);
        return res.render('home',context);

    });
}
module.exports.contact = function(req,res){
    return res.end("<h1> contacts are available her soon</h1>");
}