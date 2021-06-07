const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const Region = new mongoose.Schema({
    name: {
        type: String,
        unique: true
      },
      createdAt: {
        type: Date,
      },
      updatedAt: {
        type: Date,
      },
      country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "countries",
        require: true
      },
  },  
  {
    toJSON: { virtuals: true }
  },
  );

  // Virtual populate
Region.virtual("children", {
    ref: "locations",
    foreignField: "region_id",
    localField: "_id"
  });
  
  module.exports = mongoose.model("regions" , Region);