const express = require('express');
const bodyParser = require('body-parser');
const Todos = require('../models/tasks.js');

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

const api = '/';

router.route(api + ':uid')
    .post(async (req, res) => {
        const uid = String(req.params.uid);
        const body = req.body;
        try {
            await Todos.updateOne({ uid: uid }, { $push: { todos: body } });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        const uid = String(req.params.uid);
        const body = req.body;
        try {
            await Todos.updateOne(
                { uid: uid, "todos.todoId": body['todoId'] },
                { $set: { "todos.$": body } }
            );
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

router.route(api + ':uid' + '/id/' + ':id')
    .delete(async (req, res) => {
        const uid = String(req.params.uid);
        const id = String(req.params.id);
        try {
            await Todos.updateOne(
                { uid: uid },
                { $pull: { todos: { id: id } } }
            );
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
