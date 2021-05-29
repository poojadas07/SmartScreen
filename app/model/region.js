const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Region' , RegionSchema);