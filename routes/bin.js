const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
const todoFile = path.join(__dirname, '../data/todos.json');
const binFile = path.join(__dirname, '../data/bin.json');

const api = '/';
todo = require(todoFile);
bin = require(binFile);

router.use(bodyParser.json());

taskObj = {
    taskLabel: "",
    incompleted: [],
    completed: []
}

router.get(api, (req, res) => {
    return res.json(bin)
})

router.route(api + ':taskId/' + ':id')
    .post((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);
        binTask = bin['tasks'].find((task) => task.taskId === taskId);
        taskIndex = todo['tasks'].findIndex((task) => task.taskId === taskId);

        const binTaskIndex = binTask['completed'].findIndex((task) => task.id === id);

        if (binTask === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }

        if (taskIndex === -1) {
            taskObj['taskId'] = taskId;
            taskObj['taskLabel'] = binTask['taskLabel'];
            taskObj['completed'].push(binTask['completed'][binTaskIndex]);
            todo['tasks'].push(taskObj)
        }
        else {
            todo['tasks'][taskIndex]['completed'].push(binTask['completed'][binTaskIndex])
        }
        binTask['completed'].splice(todoIndex, 1);
        fs.writeFile(file, JSON.stringify(bin), (err, data) => {
            return res.json({ status: "deleted" })
        })
        fs.writeFile(file, JSON.stringify(todo), (err, data) => {
            taskObj = {
                taskLabel: "",
                incompleted: [],
                completed: []
            }
            return res.json({ status: "deleted" })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);
        task = bin['tasks'].find((task) => task.taskId === taskId);

        const todoIndex = task['completed'].findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        task['completed'].splice(todoIndex, 1);

        fs.writeFile(file, JSON.stringify(bin), (err, data) => {
            return res.json({ status: "Deleted Permanently" })
        })
    })

module.exports = router;
