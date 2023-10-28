const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, './todos.json');
const api = '/';
todos = require(file);

router.use(bodyParser.json());

router.get(api, (req, res) => {
    return res.json(todos)
})

router.post(api + ':taskId', (req, res) => {
    const body = req.body
    const taskId = String(req.params.taskId);
    console.log(body, taskId);
    task = todos['tasks'].find((task) => task.taskId === taskId);

    task['incompleted'].push({ ...body, id: task['incompleted'].length + 1 })
    fs.writeFile(file, JSON.stringify(todos), (err, data) => {
        return res.json({ status: "added", addedData: body })
    })
})

router.get(api + ':taskId', (req, res) => {
    const taskId = String(req.params.taskId);
    task = todos['tasks'].find((task) => task.taskId === taskId);

    return res.json(task)
})

router.route(api + ':taskId/' + ':id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);
        task = todos['tasks'].find((task) => task.taskId === taskId);

        todo = task['incompleted'].find((todo) => todo.id === id);
        console.log(todo, "klklkl");
        return res.json(todo)
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);

        task = todos['tasks'].find((task) => task.taskId === taskId);
        const todo = task['incompleted'].find((todo) => todo.id === id);

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
        task = todos['tasks'].find((task) => task.taskId === taskId);

        const todoIndex = task['incompleted'].findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        task['incompleted'].splice(todoIndex, 1);

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "deleted" })
        })
    })

module.exports = router;
