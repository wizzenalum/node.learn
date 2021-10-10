const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAAR_PATH = '/uploads/users/avatars'

const userSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        
        email:{type:String, required:true, unique:true},
        password:{type:String,required:true},
        avatar:{
            type:String,
        },
        
    },{
        timestamps:true
    }
);


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  // static methods for users
userSchema.statics.uploadedAavatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAAR_PATH;

const User = mongoose.model("User",userSchema);
module.exports = User;