const express = require('express');
const bodyParser = require('body-parser');
const Mode = require('../models/mode.js')

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
const api = '/';

router.route(api + ':id')
    .get(async (req, res) => {
        try {
            const id = req.params.id;
            const mode = await Mode.findById(id);
            return res.json(mode);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })
    .patch(async (req, res) => {
        const id = req.params.id;
        const modeInput = req.body.mode;
        try {
            const mode = await Mode.findByIdAndUpdate(id, { mode: modeInput });
            return res.json(mode);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
