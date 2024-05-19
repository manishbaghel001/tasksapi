// This API created for SMR ROYAL GYM(freelancing project) for sending mail for contact us form
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
        const { name, email, number, desc } = req.body;
        const mailOptions = {
            from: `"${name}" <manish20171999@gmail.com>`,
            to: 'manish20181998@gmail.com',
            subject: `${name} wants to connect with you`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">New Connection Request</h2>
                <p>Dear SRM Royal Gym,</p>
                <p><strong>${name} </strong>wants to connect with you. Below are the details:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${number}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Comments</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${desc}</td>
                    </tr>
                </table>
                <p>Best regards,</p>
                <p><em>SMR Royal Gym Automated Email System</em></p>
            </div>
        `
        };

        try {
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                return res.status(200).send({ status: 'Email sent' });
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        }
    });

module.exports = router;