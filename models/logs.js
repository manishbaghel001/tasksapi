const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    log: { type: String }
});

const Logs = mongoose.model('logs', logSchema);

module.exports = Logs 
