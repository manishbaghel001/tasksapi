const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, './todos.json');
const api = '/todos/';
todos = require(file);
router.use(bodyParser.json());

router.use(cors());

taskObj = {
    taskLabel: "",
    incompleted: [],
    completed: []
}

router.get(api, (req, res) => {
    return res.json(todos)
})

router.post(api + ':taskId', (req, res) => {
    const body = req.body
    const taskId = String(req.params.taskId);
    console.log(body, taskId);

    todos[taskId]['incompleted'].push({ ...body, id: todos[taskId]['incompleted'].length + 1 })
    fs.writeFile(file, JSON.stringify(todos), (err, data) => {
        return res.json({ status: "added", addedData: body })
    })
})

router.get(api + ':taskId', (req, res) => {
    const taskId = String(req.params.taskId);
    return res.json(todos[taskId])
})

router.route(api + 'create/' + ':taskId')
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

router.route(api + ':taskId/' + ':id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);

        todo = todos[taskId]['incompleted'].find((todo) => todo.id === id);
        console.log(todo, "klklkl");
        return res.json(todo)
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);

        const todo = todos[taskId]['incompleted'].find((todo) => todo.id === id);

        if (!todo) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todo.name = req.body.name;
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "updated", updatedData: req.body })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);

        const todoIndex = todos[taskId]['incompleted'].findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todos[taskId]['incompleted'].splice(todoIndex, 1);

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "deleted" })
        })
    })

module.exports = router;
