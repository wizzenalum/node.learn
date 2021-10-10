const { findByIdAndDelete } = require('../models/todo-list');
const TodoList = require('../models/todo-list');
console.log("************  ", TodoList,"  *******************");


// this action will open index page
module.exports.index = function(req,res){
    TodoList.find(function(err, todoList){
        console.log("request is made to  ", req.url);
        if(err){ 
            console.log(`erro fetching the todolist is  ${err}`);
        return }
        // to set increasing order of the query; 
        let todoArray = [];
        for(var event in todoList){
            todoArray.push(todoList[event]);
        }
        todoArray.sort((a,b)=> b.dueDate.getTime() - a.dueDate.getTime());

        context= {
            'todoList':todoArray
        }
        console.log("page is sent",todoArray[0]);
        return res.render('dashboard',context);
        });
    }
// this action for creating new task for todo list.
module.exports.create = function(req,res){
    console.log("reuiest is made to",req.url);
    // creating task
    var task = {
        description:req.body.description,
    dueDate:req.body.due,
    category:req.body.category
    }
    //saving task to database
    TodoList.create(task, function(err,documentCreateed){
        if(err){console.log(`err during creating the database instance`)
        return;
        }
        console.log("request is made to crete and creted object is   ",documentCreateed.description)
        return res.redirect('back');
    })
} 

// this will delete single task
module.exports.delete = function(req,res){
    var id = req.query.id;
    console.log("reuiest is made to",req.url);
    TodoList.findByIdAndDelete(id,function(err){
        if(err){
            console.log("deletion is not done");
            return;
        }
        console.log("item deleted was", id);
        return res.redirect('back');
    });
}

// delete multiple tasks
module.exports.deleteMulti = function(req,res){
    console.log("reuwi",req.query);
    for(var a in req.query){
        console.log(a,req.query[a]);
    }
    TodoList.deleteMany({_id:{$in:req.query.id}},function(err,result){
        if(err) console.log("there is some issue in deltion-many" ,err);
        console.log("result is ",result);
        return res.redirect('back');
    });
}