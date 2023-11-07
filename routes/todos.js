const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Todos = require('../models/todos.js')

router.use(bodyParser.json());
const api = '/';
const activityApi = '/activity/';
const batchApi = '/batch/';

router.use(express.urlencoded({ extended: false }));

router.get(api, async (req, res) => {
    try {
        const todos = await Todos.find({});
        return res.json(todos);
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
                completed: false
            })
            return res.status(201).json({ status: "Success" })
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
            const binItem = await Todos.findById(id)
            if (binItem.deleted == undefined || !binItem.deleted) {
                await Todos.findByIdAndUpdate(id, { deleted: true });
                return res.json({ status: 'Success' });
            }
            else if (binItem.deleted != undefined && binItem.deleted) {
                await Todos.findByIdAndDelete(id);
                return res.json({ status: 'Success' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

router.route(activityApi + ':id')
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

module.exports = router;
