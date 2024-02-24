const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const Tasks = require('../models/tasks.js')

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const api = '/';

router.route(api + ':uid')
    .get(async (req, res) => {
        const uid = String(req.params.uid);
        try {
            const task = await Tasks.find({ uid: uid });
            if (task && task.length > 0) {
                res.send(task[0].img.data);
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    })
    .post(upload.single('image'), async (req, res) => {
        const uid = String(req.params.uid);
        try {
            let imgData
            if (req.file) {
                imgData = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                }
            }
            else {
                imgData = {
                    data: '',
                    contentType: '',
                }
            }
            await Tasks.updateOne({ uid: uid }, {
                img: imgData
            });
            return res.json("Image changed successfully");
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

module.exports = router;