const express = require("express");
const router = express.Router();

router.post('/sendMessage', function (req, res) {
    const { name, email, subject, message } = req.body;
     var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "braudeTestEMail@gmail.com",
            pass: "ylbrxnjvpgqssesp"
        }
    });
    var mailOptions = {
        from: "braudeTestEMail@gmail.com",
        to: email,
        subject: "Thanks " + name + "  for contact Us Vconventer  ",
        text: "We will get back to you at the earliest!" + " \n Your subject is :- \n" + subject
            + "\n\n Your subject is :- \n" + message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send({ success: "fasle" });
        } else {  
            res.send({ success: "true" });

        }
    })
})
module.exports = router;