// importing all required modules after installing
const express = require('express'); 
const mongoose = require('mongoose'); 

// making connection to data base and create a connection variable db.
mongoose.connect('mongodb://localhost:27017/myapp',{ useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;

// checking connection is made or not to the data base
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection to database is done");
});

// variavbles need for starting server
const app = express();
const port = 8080;

app.set('view engine','ejs');// making ejs as view rendering engine
app.set('views','./views'); // seting path for view engine for loacation.


app.use(express.static("./assets")); // set the path for staic files 

//setting the parser to parse the post data from the form
app.use(express.urlencoded());


// connecting to the server
app.listen(port, function(err){
    if(err) console.log(`server got ERROR: ${err}`);
    console.log(`server running on PORT: ${port}`);
});

// telling express to route from routes directory
app.use('/',require('./routes'));





