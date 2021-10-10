const express = require('express'); 
const mongoose = require('mongoose'); 


// there is developent/ test / production envioonmnent for any codes. 
// here we connect the odm(object document maper) mongoose to the dbms mongodb.
mongoose.connect('mongodb://localhost/codial_developement', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;// db store the connection

// cheacking the connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("catabase connection is established");
});

// exporting the connection.
module.exports = db;