const express = require('express');
//  this is the ejs layout library help to make layouts
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const db = require('./config/mongoose');

// used for seession cookkie authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stretegy');

const MongoStore = require('connect-mongo');


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

console.log("******************        "+db+"           ****************************")


app.set('view engine','ejs');
app.set('views','./views');
// mongo stare is used to store the session cokie
// adding middle ware for the sessions
app.use(session({
    name:'codial',
    //TODO change the secreat before deployment in production
    secret:'blahblahblah',
    saveUninitialized:false, // when user is not logged in then should i save extra data.
    resave:false,  // when user is login if session data is not changed it will prevent to resaving again and again
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codial_developement',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect to the mongo connect');
        }
    ),
}));

// adding middle ware
app.use(passport.initialize());
app.use(passport.session());

// this middle ware set the.
app.use(passport.setAuthenticatedUser)

// use the router 
app.use('/',require('./routes'));


// starting express server at some port
app.listen(port,function(err){
    if(err) console.log(`server is not running: ${err}`);// here i am using the interpolation to show the data
    console.log(`server is running on ${port}`);
})

