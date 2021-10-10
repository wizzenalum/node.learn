const Profile = require('../models/Profile');



module.exports.home = function(req,res){
    let context = {
        title:Profile.title,
        name:"home"
    };
    return res.render('home',context);
}

module.exports.contact = function(req,res){
    return res.end("<h1> contacts are available her soon</h1>");
}