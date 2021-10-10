const mongoose = require('mongoose');

// here creating schema for todo lists.
const todoSchema = new mongoose.Schema({
    description:String,
    dueDate:{ type: Date, default: Date.now },
    category:{type:String,required:true}
});
const TodoList = mongoose.model('TodoList',todoSchema);
module.exports = TodoList;