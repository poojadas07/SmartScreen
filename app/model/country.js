const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Country = new Schema({
    name: {
      type: String
    }
  }, {
    timestamps: true
})
  
module.exports = mongoose.model('Country', Country);