// importing all required modules after installing
const express = require('express'); 

// variavbles need for starting server
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

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
app.get('/',function(req,res){
  context = {
      title:"hey there",
  }
  return res.render('dashboard',context)
});





