const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    console.log(process.env.APP_UNAME)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            auth: {
                user: process.env.APP_UNAME,
                pass: process.env.APP_PWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.APP_UNAME,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};

module.exports = sendEmail