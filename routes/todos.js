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

router.get(api + '/complete/' + ':taskId/' + ':id', (req, res) => {
    const taskId = String(req.params.taskId);
    const id = String(req.params.id);

    console.log(id, taskId);

    const index = todos[taskId].incompleted.findIndex(item => item.id === id);
    if (index !== -1) {
        const object = todos[taskId]['incompleted'][index];
        this.stuff['incompleted'].splice(index, 1);
        this.stuff['completed'].push(object);
    }

    fs.writeFile(file, JSON.stringify(todos), (err, data) => {
        return res.json({ status: "completed", completedData: todos[taskId]['incompleted'][index] })
    })
})

router.get(api + ':taskId', (req, res) => {
    const taskId = String(req.params.taskId);
    return res.json(todos[taskId])
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
