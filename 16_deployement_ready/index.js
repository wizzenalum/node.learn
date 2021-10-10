const exp = require("constants");
const express = require("express");
const path = require("path");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
// const sassMiddleware = require('node-sass-middleware');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require("passport");
const passportLocal = require("./config/passportLocals");
const passportJwt = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongo");
const logger = require("morgan");

const env = require("./config/environment");

// used for saving the flash info to the res
const flash = require("connect-flash");
const costumMware = require("./config/midleware"); // my middleware to save the message.

// settting multer to handle the fiels in the app.

const app = express();
const port = 8000;

// setup to access the assets files in developement mode.
require("./config/view_helpers")(app);

// setup the chating settion to use socket.io
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

// // setup the scss for the node express.
// if(env.name=='development'){
//     app.use(sassMiddleware({
//         /* Options */
//         src: path.join(__dirname,env.asset_path,'scss'),
//         dest: path.join(__dirname,env.asset_path,'styles'),
//         debug: true,
//         outputStyle: 'compressed',
//         prefix:  '/styles'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
//     }));
// }

// seting the propertis for view engine.
app.set("view engine", "ejs");
app.set("views", "./views"); //auto matically look for views even you dont set this value.

// setting express layouts
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// the path that you provide to the express.static function is
//relative to the directory from where you launch your node process.
//If you run the express app from another directory, it’s safer to
//use the absolute path of the directory that you want to serve:

app.use(express.static(env.asset_path));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(logger(env.morgan.mode, env.morgan.options));

const fs = require("fs");
// fs.unlink('/uploads/users/avatars/avatar-1626454735020', function(err){
//     if(err) console.log("error",err)
//     console.log('file is delted')
// })

// url encoder to encode the data.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  // only print the requested urls.
  console.log(
    `************* method is: ${req.method}  requesting to:  ${req.url}`
  );
  next();
});

app.use(
  session({
    name: "wixy",
    secret: env.session_cookie_key,

    saveUninitialized: false, // when user is not logged in then should i save extra data.
    resave: false, // when user is login if session data is not changed it will prevent to resaving again and again
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codial_developement",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect to the mongo connect");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(costumMware.setFlash);

app.use(require("./routes"));

// console.log("***************************",app.locals);

app.listen(port, function (err) {
  console.log(err || "server up and running " + port);
});

/// TODO
/* 
display notifications --- noty
add delete comments using ajax 
*/