const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
const path = require('path');
const file = path.join(__dirname, './todos.json');
const api = '/';
todos = require(file);
router.use(bodyParser.json());

router.route(api + ':mode')
    .patch((req, res) => {
        const mode = String(req.params.mode);
        console.log(mode);
        if (todos['mode'])
            todos['mode'] = mode

        fs.writeFile(file, JSON.stringify(todos), (err, data) => {
            return res.json({ status: "mode changed", mode: mode })
        })
    })

module.exports = router;
