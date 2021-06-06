const mongoose = require('mongoose');

const Screen = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
        require: true
    },
  });

module.exports = mongoose.model("screens" , Screen);