const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
  },
);

module.exports = mongoose.model("user" , User);