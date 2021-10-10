const express = require('express');
const path = require('path');// this inbuld module.

const port = 8090;
const app = express();

// moving forwarde we will gonna use  ejs template engine.

// tell express that ejs will be template or view engine

app.set('view engine','ejs');
// seting the path for templates
app.set('views',path.join(__dirname,'views'))


// run the server
var handleServer = function(err){
    if(err) console.log("this is the error",err);
    console.log("server is up and runnign");
}
app.listen(port,handleServer);


// hanling requests
var handleRequest = function(req,res){
    console.log(__dirname);// print the directory from where index.js gonna run.
    return res.render('home');    
}

app.get('/', handleRequest);
