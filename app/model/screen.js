const mongoose = require('mongoose');

const Screen = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    rows: {
        type: Number,      
    },
    columns: {
        type: Number,      
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
        require: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clients",
        require: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        require: true
    },
    region_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "regions",
      require: true
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
      require: true
    },
  });

module.exports = mongoose.model("screens" , Screen);