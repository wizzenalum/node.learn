//  vedio 1
 // create folder then create indec.js 
 // $ npm init
 //$ npm install express

 // vedio 2

 // import express
 const express = require('express');
 const port = 8000;
 const app = express();


var handleApp = function(err){
    if(err){
        console.log('error in running the server');
    }
    console.log("server is working");
}
app.listen(port,handleApp);