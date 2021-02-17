const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Country' , CountrySchema);