const express = require('express');
//  this is the ejs layout library help to make layouts
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 8000;

const db = require('./config/mongoose');

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

/*

file structure is as given below.
.
├── assets
│   ├── image
│   ├── script
│   │   └── home-script.js
│   └── style
│       ├── home-style.css
│       └── layout.css
├── config
│   └── mongoose.js
├── controlers
│   ├── home_controler.js
│   ├── post_controler.js
│   └── users_controler.js
├── index.js
├── models
├── package.json
├── package-lock.json
├── routes
│   ├── index.js
│   ├── post.js
│   └── users.js
└── views
    ├── home.ejs
    ├── layout.ejs
    ├── partials
    │   ├── _footer.ejs
    │   └── _header.ejs
    └── user-profile.ejs

assets:- assets contains all static files like logo, images, fonts, styles, java scripts etc.
config:- contains the settings done for any module or library used like we did for mongoose database.
controler:-  this will contain all the controllers for deffferent section of the website.
index.js:- this is the central part of all the files where everything start and ends.
models:- all the data base models present here and they communicate with controllers.
routes:- path to the specific page is design here.
views:- it contain all view for the clients. which have concepts of layout partials etc.

*/