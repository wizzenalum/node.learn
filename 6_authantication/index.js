const express = require('express');
//  this is the ejs layout library help to make layouts
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const db = require('./config/mongoose');

// to encode the post request from the form
app.use(express.urlencoded());

// to encodeand decode cookies
app.use(cookieParser());

// before all routes this middleware should be called to use layout feature
app.use(expressLayout);

// setting these to layout so that script and style file can move to head and bottom in layout.
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);

app.use(express.static('assets'));  // setup the 


// use the router 
app.use('/',require('./routes'));


// starting express server at some port
app.listen(port,function(err){
    if(err) console.log(`server is not running: ${err}`);// here i am using the interpolation to show the data
    console.log(`server is running on ${port}`);
})

app.set('view engine','ejs');
app.set('views','./views');
