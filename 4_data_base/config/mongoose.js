//require the library
const mongoose = require('mongoose');

//connectinge the library to the mongo db

mongoose.connect('mongodb://localhost/contact_list', {useNewUrlParser: true, useUnifiedTopology: true})
.catch(error=>console.log("connection failed",error));

// making a variable db to see through the connection
const db = mongoose.connection;
// now updating that connection is made or not.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("mongo db is connected successfullly")
});