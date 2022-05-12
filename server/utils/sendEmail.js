const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, url, uname) => {
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
            html: `<h1>Hello ${uname}!</h1>
                <p>Thank you for signing up on Test Deck! Please verify your email by clicking the link below</p>
                <a href=${url}> Click here</a>
                </div>`
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};

module.exports = sendEmail