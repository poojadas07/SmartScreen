const mongoose = require('mongoose');

const Location = new mongoose.Schema({
    name: {
        type: String,
        unique: true
      },
      region_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "regions",
        require: true
      },
  },
  {
    toJSON: { virtuals: true }
  }
  );

  // Virtual populate
  Location.virtual("client", {
    ref: "clients",
    foreignField: "location_id",
    localField: "_id"
  });
  
module.exports = mongoose.model("locations" , Location);