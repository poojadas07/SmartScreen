const mongoose = require('mongoose');

const Client = new mongoose.Schema({
    name: {
        type: String,
        unique: true
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
 Client.virtual("department", {
    ref: "departments",
    foreignField: "client_id",
    localField: "_id"
  });

module.exports = mongoose.model("clients" , Client);