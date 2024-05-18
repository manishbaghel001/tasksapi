
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
const api = '/';

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'manish20171999@gmail.com',
        pass: 'osta ctzf qibs buon'
    }
});

router.route(api)
    .post(async (req, res) => {
        const { name, email, number, age } = req.body;
        const mailOptions = {
            from: name,
            to: 'manish20171999@gmail.com',
            subject: `${name} wants to connect with you.`,
            text:
                ` ${name} wants to connect with you.\n
                requestor has shared you below details.\n
            Name: ${name}\nEmail: ${email}\nNumber: ${number}\nAge: ${age}`
        };

        try {
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                return res.status(200).send('Email sent: ' + info.response);
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    });

module.exports = router;

