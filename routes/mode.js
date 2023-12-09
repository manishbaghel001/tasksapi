const express = require('express');
const bodyParser = require('body-parser');
const Mode = require('../models/tasks.js')

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
const api = '/';

router.route(api + ':uid')
    .get(async (req, res) => {
        const uid = String(req.params.uid);

        try {
            const mode = await Mode.findOne({ uid: uid });
            return res.json(mode['mode']);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        const modeInput = req.body.mode;
        const uid = String(req.params.uid);

        try {
            await Mode.updateOne({ uid: uid }, { mode: modeInput });
            return res.json("Mode changed successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
