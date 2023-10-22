const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, '../myTasks.json');
todos = require(file);
const api = '/myTasks/';

router.use(bodyParser.json());

router.use(cors());

router.get(api, (req, res) => {
    console.log("My Tasks Get API data", res.json(todos));
    return res.json(todos)
})

router.post(api, (req, res) => {
    const body = req.body
    todos.push({ ...body, id: todos.length + 1 })
    fs.writeFile(file, JSON.stringify(todos), (err, data) => {
        console.log("My Tasks Post API data", body);
        return res.json({ status: "added", data: body })
    })
})

router.route(api + ':id')
    .get((req, res) => {
        const id = Number(req.params.id);
        todo = todos.find((todo) => todo.id === id);
        console.log("My Tasks Get API data for id " + id, todo);
        return res.json(todo)
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const todo = todos.find((todo) => todo.id === id);

        if (!todo) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todo.name = req.body.name;
        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            console.log("My Tasks Patch API data for id " + id, todo);
            return res.json({ status: "edited", data: todo })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todos.splice(todoIndex, 1);

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            console.log("My Tasks Delete API data for id " + id);
            return res.json({ status: "deleted", deletedID: id })
        })
    })

module.exports = router;
