const mongoose = require("mongoose");

const Country = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    }
  },
  {
    toJSON: { virtuals: true }
  },
);

// Virtual populate
Country.virtual("children", {
  ref: "regions",
  foreignField: "country_id",
  localField: "_id"
});

module.exports = mongoose.model("countries", Country);