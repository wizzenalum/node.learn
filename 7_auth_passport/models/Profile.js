const mongoose = require('mongoose');

const rawSchema = new mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }, 
  });
const Data = mongoose.model('Data',rawSchema);

module.exports = Data;