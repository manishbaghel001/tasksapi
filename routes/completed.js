const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, './todos.json');
const api = '/complete/';
todos = require(file);
router.use(bodyParser.json());

router.route(api + ':taskId/' + ':id')
    .get((req, res) => {
        const taskId = String(req.params.taskId);
        const id = Number(req.params.id);
        console.log(id, taskId);

        const index = todos[taskId]['incompleted'].findIndex(item => item.id === id);
        if (index !== -1) {
            const object = todos[taskId]['incompleted'][index];
            todos[taskId]['incompleted'].splice(index, 1);
            todos[taskId]['completed'].push(object);
        }

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "completed", completedData: todos[taskId]['incompleted'][index] })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const taskId = String(req.params.taskId);

        const todoIndex = todos[taskId]['completed'].findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Object not found' });
        }
        todos[taskId]['completed'].splice(todoIndex, 1);

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "deleted" })
        })
    })

module.exports = router;
