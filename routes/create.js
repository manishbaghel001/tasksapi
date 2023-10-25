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
        console.log(body, taskId);

        taskObj['taskLabel'] = body['taskName']
        console.log(body, taskId);
        if (todos[taskId]) {
            todos[taskId + '1'] = taskObj
        } else
            todos[taskId] = taskObj
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "added", addedData: taskObj })
        })
    })
    .patch((req, res) => {
        const taskId = String(req.params.taskId);

        if (!todo) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todos[taskId]['taskLabel'] = req.body.taskName;
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "updated", updatedData: req.body })
        })
    })
    .delete((req, res) => {
        const taskId = String(req.params.taskId);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        delete todos[taskId];

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "deleted" })
        })
    })

module.exports = router;
