const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
// const file = path.join(__dirname, '../data/todos.json');
// const binFile = path.join(__dirname, '../data/bin.json');
const api = '/';
// todos = require(file);
// binTodos = require(binFile);

router.use(bodyParser.json());

taskObj = {
    taskLabel: "",
    completed: []
}

router.route(api + ':taskId/' + ':id')
    .get((req, res) => {
        const taskId = String(req.params.taskId);
        const id = Number(req.params.id);
        console.log(id, taskId, todos);

        task = todos['tasks'].find((task) => task.taskId === taskId);

        console.log(id, taskId);

        const index = task['incompleted'].findIndex(item => item.id === id);
        if (index !== -1) {
            const object = task['incompleted'][index];
            task['incompleted'].splice(index, 1);
            task['completed'].push(object);
        }

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "completed", completedData: task['completed'][index] })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);
        task = todos['tasks'].find((task) => task.taskId === taskId);

        const todoIndex = task['completed'].findIndex((todo) => todo.id === id);
        const binTodoIndex = binTodo['tasks'].findIndex((todo) => todo.taskId === taskId);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }

        if (binTodoIndex === -1) {
            taskObj['taskId'] = taskId;
            taskObj['taskLabel'] = task['taskLabel'];
            taskObj['completed'].push(task['completed'][todoIndex]);
            binTodos['tasks'].push(taskObj)
        }
        else {
            binTodos['tasks'][binTodoIndex]['completed'].push(task['completed'][todoIndex])
        }
        task['completed'].splice(todoIndex, 1);
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            // return res.json({ status: "deleted" })
        })
        fs.writeFile(file, JSON.stringify(binTodos), (err, data) => {
            taskObj = {
                taskLabel: "",
                completed: []
            }
            return res.json({ status: "deleted" })
        })
    })

module.exports = router;
