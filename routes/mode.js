const express = require('express');
const bodyParser = require('body-parser');
const Mode = require('../models/mode.js')

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
const api = '/';

router.route(api)
    .get(async (req, res) => {
        try {
            const mode = await Mode.find({});
            return res.json(mode);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        const modeInput = req.body.mode;
        try {
            await Mode.updateOne({ type: "mode" }, { mode: modeInput });
            return res.json("Mode changed successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
