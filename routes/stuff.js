const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, '../stuff.json');
const api = '/stuff/';
todos = require(file);
router.use(bodyParser.json());

router.use(cors());

router.get(api, (req, res) => {
    return res.json(todos)
})

router.post(api, (req, res) => {
    const body = req.body
    console.log(body);
    todos.push({ ...body, id: todos.length + 1 })
    fs.writeFile(file, JSON.stringify(todos), (err, data) => {
        return res.json({ status: "pending", data: todos })
    })
})

router.route(api + ':id')
    .get((req, res) => {
        const id = Number(req.params.id);
        todo = todos.find((todo) => todo.id === id);
        console.log(todo, "klklkl");
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
            return res.json({ status: "true" })
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
            return res.json({ status: "true" })
        })
    })

module.exports = router;
