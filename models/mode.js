const mongoose = require("mongoose");

const modeSchema = new mongoose.Schema({
    mode: { type: String, required: true }
},
    { timestamps: true }
);

const Mode = mongoose.model('modes', modeSchema);

module.exports = Mode 
