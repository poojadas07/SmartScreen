const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    name: {
        type: String,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Country' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Region' , RegionSchema);