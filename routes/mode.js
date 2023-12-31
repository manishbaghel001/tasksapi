const express = require('express');
const bodyParser = require('body-parser');
const Mode = require('../models/tasks.js')

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
const api = '/';

router.route(api + ':uid')
    .patch(async (req, res) => {
        const modeInput = req.body.mode;
        const boardInput = req.body.mainBoard;
        const uid = String(req.params.uid);

        try {
            if (modeInput) {
                await Mode.updateOne({ uid: uid }, { mode: modeInput });
                return res.json("Mode changed successfully");
            } else if (boardInput) {
                await Mode.updateOne({ uid: uid }, { mainBoard: boardInput });
                return res.json("Mode changed successfully");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    })

module.exports = router;
