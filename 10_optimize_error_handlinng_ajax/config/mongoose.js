const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).catch(err=>(console.log('\x1b[5m hello this is error so just return something \x1b[1m')))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGODB connection error:'));
db.once('open',function(){
    console.log("data base is connected")   
})
module.exports = db;