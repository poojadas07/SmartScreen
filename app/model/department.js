const mongoose = require('mongoose');

const Department = new mongoose.Schema({
    name: {
        type: String,
        unique: true
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
  {
    toJSON: { virtuals: true }
  }
);

// Virtual populate
Department.virtual("screen", {
    ref: "screens",
    foreignField: "department_id",
    localField: "_id"
  });

module.exports = mongoose.model("departments" , Department);