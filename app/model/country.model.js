const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: {
        type: String
    },
    region: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Region' }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Country' , CountrySchema);