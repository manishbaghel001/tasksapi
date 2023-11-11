const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    taskLabel: { type: String, required: true, unique: true },
    deleted: { type: Boolean }
},
    { timestamps: true }
);

const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = Tasks 
