const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    uid: { type: String },
    mainBoard: { type: String },
    tasks: { type: Array },
    todos: { type: Array },
    mode: { type: String },
    img:
    {
        data: Buffer,
        contentType: String
    }
},
    { timestamps: true }
);

const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = Tasks 
