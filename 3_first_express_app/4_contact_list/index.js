const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

//setup the template engine
app.set('view engine','ejs');
app.set('path',__dirname+'views')

// starting server
let handleServer = function(err){
    if(err) console.log('this is error duing staritng server');
    console.log('server is up and running');
}
app.listen(port,handleServer);



// handling requests
let handleRequest = function(req,res){
    console.log(__dirname);
    res.render('home',{title:"my this done"}); 
}
app.get('/',handleRequest);

app.get('/practice',function(req,res){
    context = {
        title:"hey there",
        heading:"head is great",
        condition:false
    }
    return res.render('practice',context)
});

