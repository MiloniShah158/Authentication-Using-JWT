const nodemailer = require("nodemailer");

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shahmilu35@gmail.com",
            pass: "mjshah1821",
        },
    });
    const mailOptions = {
        from: "shahmilu35@gmail.com",
        to: "dharanpadhiyar2112@gmail.com",
        subject: options.subject,
        html: options.text,
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;