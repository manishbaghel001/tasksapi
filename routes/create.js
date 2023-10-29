const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, './todos.json');
const api = '/';
todos = require(file);

router.use(bodyParser.json());

taskObj = {
    taskLabel: "",
    incompleted: [],
    completed: []
}

router.route(api + ':taskId')
    .post((req, res) => {
        const body = req.body
        const taskId = String(req.params.taskId);
        task = todos['tasks'].find((task) => task.taskId === taskId);

        console.log(body, taskId);

        taskObj['taskLabel'] = body['taskName']
        console.log(body, taskId);
        if (task) {
            taskObj['taskId'] = taskId + '1'
            todos['tasks'].push(taskObj)
        } else {
            taskObj['taskId'] = taskId
            todos['tasks'].push(taskObj)
        }
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "added", addedData: taskObj })
        })
    })
    .patch((req, res) => {
        const taskId = String(req.params.taskId);
        task = todos['tasks'].find((task) => task.taskId === taskId);

        if (!task) {
            return res.status(404).json({ error: 'Object not found' });
        }
        console.log(req.body.taskName, taskId)
        task['taskLabel'] = req.body.taskName;
        task['taskId'] = req.body.taskName.replace(/ /g, "");;
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "updated", updatedData: req.body })
        })
    })
    .delete((req, res) => {
        const taskId = String(req.params.taskId);
        const todoIndex = todos['tasks'].findIndex((todo) => todo.taskId === taskId);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todos['tasks'].splice(todoIndex, 1);

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "deleted" })
        })
    })

module.exports = router;
