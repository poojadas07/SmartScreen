const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    name: String,
    locationName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Location' , LocationSchema);