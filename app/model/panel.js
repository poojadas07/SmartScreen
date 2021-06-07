const mongoose = require('mongoose');

const Panel = new mongoose.Schema({
    name: {
        type: String,
        unique: false
    },
    row_no: {
        type: Number,
    },
    column_no: {
        type: Number,
    },
    current_value: {
        type: Number,
    },
    current_time_value: {
        type: String,
        required: false
    },
    current_updated_time: {
        type: String,
        required: false
    },
    previous_value: {
        type: String,
        required: false
    },
    previous_time_value: {
        type: String,
        required: false
    },
    previous_updated_time: {
        type: String,
        required: false
    },
    sensor_id: {
        type: String,
        required: false
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    screen_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "screens",
        require: true
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
  },
  );

module.exports = mongoose.model("panels" , Panel);