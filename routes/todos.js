const express = require('express');
const bodyParser = require('body-parser');
const Todos = require('../models/todos.js');

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

const api = '/';
const completeApi = '/complete/';
const batchApi = '/batch/';
const apiBin = '/bin/';
const apiBatchBin = '/batch/bin/';

router.get(api, async (req, res) => {
    try {
        const todos = await Todos.find({});
        return res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving tasks');
    }
})

router.route(api + ':id')
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const tasks = await Todos.findById(id);
            return res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        try {
            await Todos.findByIdAndUpdate(id, { todoName: req.body.todoName });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        try {
            await Todos.findByIdAndUpdate(id, { deleted: true });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

router.route(batchApi + ':id')
    .get(async (req, res) => {
        const id = String(req.params.id);
        try {
            const tasks = await Todos.find({ taskId: id });
            return res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .post(async (req, res) => {
        const body = req.body
        const id = String(req.params.id);
        try {
            await Todos.create({
                taskId: id,
                todoName: body.todoName,
                completed: false,
                deleted: false,
            })
            return res.status(201).json({ status: "Success" })
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        try {
            const taskId = req.params.id;
            await Todos.updateMany({ taskId: taskId }, { $set: { deleted: true } });
            res.status(200).json({ message: 'Todo deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

router.route(completeApi + ':id')
    .get(async (req, res) => {
        const id = String(req.params.id);
        try {
            const tasks = await Todos.findByIdAndUpdate(id, { completed: true });
            return res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

router.route(apiBin + ':id')
    .patch(async (req, res) => {
        const id = req.params.id;
        try {
            await Tasks.findByIdAndUpdate(id, { deleted: false });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        try {
            await Todos.findByIdAndDelete(id);
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

router.route(apiBatchBin + ':id')
    .patch(async (req, res) => {
        try {
            const taskId = req.params.id;
            await Todos.updateMany({ taskId: taskId }, { $set: { deleted: false } });
            res.status(200).json({ message: 'Todo deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .delete(async (req, res) => {
        try {
            const taskId = req.params.id;
            console.log(taskId, "klklklkl");
            await Todos.deleteMany({ taskId: taskId });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
