const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const api = '/';
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

const Tasks = require('../models/todos.js')

router.route(api)
    .get(async (req, res) => {
        try {
            const tasks = await Tasks.find({});
            return res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .post(async (req, res) => {
        const body = req.body
        try {
            await Tasks.create({
                taskLabel: body.taskLabel,
            })
            return res.status(201).json({ status: "Success" })
        } catch (err) {
            console.error(err);
            if (err.code == 11000) {
                res.status(500).send('Task Label is duplicated.');
            } else {
                res.status(500).send('Error retrieving tasks');
            }
        }
    })

router.route(api + ':id')
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const tasks = await Tasks.findById(id);
            return res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        try {
            await Tasks.findByIdAndUpdate(id, { taskLabel: req.body.taskLabel });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        try {
            const binItem = await Tasks.findById(id)
            if (binItem.deleted == undefined || !binItem.deleted) {
                await Tasks.findByIdAndUpdate(id, { deleted: true });
                return res.json({ status: 'Success' });
            }
            else if (binItem.deleted != undefined && binItem.deleted) {
                await Tasks.findByIdAndDelete(id);
                return res.json({ status: 'Success' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
