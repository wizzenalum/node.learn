const mongoose = require('mongoose');

const conatactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    }
});

// model name or collection name is calpitilize nmaing convention?
const Contact = mongoose.model("Contact",conatactSchema);
module.exports = Contact;