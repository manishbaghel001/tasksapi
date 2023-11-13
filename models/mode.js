const mongoose = require("mongoose");

const modeSchema = new mongoose.Schema({
    mode: { type: String, required: true },
    type: { type: String }
},
    { timestamps: true }
);

const Mode = mongoose.model('modes', modeSchema);

module.exports = Mode 
