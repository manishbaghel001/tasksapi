const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todoName: { type: String, required: true, unique: true },
    taskId: { type: String },
    completed: { type: Boolean },
    deleted: { type: Boolean }
},
    { timestamps: true }
);

const Todos = mongoose.model('todos', todoSchema);

module.exports = Todos 
