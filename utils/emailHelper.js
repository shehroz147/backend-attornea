const nodemailer = require("nodemailer");

exports.sendEmail = async (email, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'shehroz.virk147@gmail.com',
                pass: 'ezLctGYh_1012',
            },
        });

        await transporter.sendMail({
            from: 'shehroz.virk147@gmail.com',
            to: email,
            subject: 'Confirmation email',
            text: text,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};


