const mongoose = require("mongoose");

const createSchema = new mongoose.Schema({
    taskLabel: { type: String, required: true, unique: true },
    deleted: { type: Boolean }
},
    { timestamps: true }
);

const Tasks = mongoose.model('tasks', createSchema);

module.exports = Tasks 
