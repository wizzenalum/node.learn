const {Schema,model} = require('mongoose');

const friendshipSchema = Schema({
    to:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

const Friendship = model("Friendship",friendshipSchema);
module.exports = Friendship;