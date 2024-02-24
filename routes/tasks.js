const express = require('express');
const bodyParser = require('body-parser');
const Tasks = require('../models/tasks.js')

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const api = '/';

router.get(api, async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        return res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving tasks');
    }
})

router.route(api + ':uid')
    .get(async (req, res) => {
        const uid = String(req.params.uid);
        try {
            const task = await Tasks.find({ uid: uid });
            if (task && task.length > 0) {
                return res.json(task);
            }
            else {
                await Tasks.create({
                    uid: uid,
                    mainBoard: 'Main Board',
                    mode: 'light',
                    tasks: [],
                    todos: [],
                    img: {
                        data: '',
                        contentType: ''
                    }
                })
                return res.status(201).json({ status: "Success" })
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .delete(async (req, res) => {
        const uid = String(req.params.uid);
        try {
            await Tasks.findOneAndDelete({ uid: uid });
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .post(async (req, res) => {
        const uid = String(req.params.uid);
        const body = req.body;
        try {
            await Tasks.updateOne({ uid: uid }, { $push: { tasks: body } });
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
            await Tasks.updateOne(
                { uid: uid, "tasks.id": body['id'] },
                { $set: { "tasks.$": body } }
            );
            return res.json({ status: 'Success' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;

// [
//     {
//         "uid": "hjkhjkhkjfhsiuferuy3ir6239kgrku2egitydiediey",
//         "mode": "dark",
//         "mainBoard": "Main Borad",
//         "tasks": [
//             {
//                 "name": "My List",
//                 "id": "654d4a6daf5143308f031bed",
//                 "deleted": false
//             },
//             {
//                 "name": "Bucket list",
//                 "id": "654d4a6daf5143408f031bed1",
//                 "deleted": false
//             }
//         ],
//         "todos": [
//             {
//                 "name": "Jumping",
//                 "id": "654d4a6daf5143308f031bed",
//                 "completed": false,
//                 "deleted": false
//             },
//             {
//                 "name": "Running",
//                 "id": "654d4a6daf5143408f031bed1",
//                 "completed": false,
//                 "deleted": false
//             }
//         ]
//     }
// ]
