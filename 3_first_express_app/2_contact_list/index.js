// $ npm init // to create package.json file
//$ npm install express // to require the express in project to use mvc framework.

const express = require('express');
const port = 8080;
const app = express();

let handleApp = function(err){
    if(err) console.log("error during runnig hte app",err);
    console.log("server up and runnig");
}

app.listen(port,handleApp);

let handleRequest = function(req,res){
    console.log(req);
    res.send("<h1> this is workign</h2>")
}

// app.get('/',handleRequest);
app.post('/',handleRequest);




// get used to get the data
//post the used to create the data.
// following generally used mostly for ajax calls
// put data in fields 
// patch gernerally useed for patch of code only
// same as put but instead of creating it delete data.


