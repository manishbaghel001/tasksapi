const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, '../data/mode.json');
const api = '/';
mode = require(file);
router.use(bodyParser.json());

router.get(api, (req, res) => {
    return res.json(mode)
})

router.patch(api + ':mode', (req, res) => {
    const modeInput = String(req.params.mode);
    console.log(mode);
    mode = modeInput

    fs.writeFile(file, JSON.stringify(mode), (err, data) => {
        return res.json({ status: "mode changed", mode: mode })
    })
})

module.exports = router;
