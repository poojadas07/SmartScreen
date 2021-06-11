const mongoose = require('mongoose');

const RawData = new mongoose.Schema({
    val: {
        type: Number,
    },
    sensorId: {
        type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  }
);

module.exports = mongoose.model("rawdata" , RawData);