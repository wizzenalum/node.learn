const mongoose = require('mongoose');
const env = require('./environment')

mongoose.connect(`mongodb://localhost:${env.db}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGODB connection error:'));
db.once('open',function(){
    console.log("data base is connected")
})

module.exports = db;