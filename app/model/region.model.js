const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    regionName: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Region' , RegionSchema);