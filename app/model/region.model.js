const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    name: String,
    countryName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Region' , RegionSchema);