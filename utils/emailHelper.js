const nodemailer = require("nodemailer");

exports.sendEmail = async (email, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'bbburhankamran@gmail.com',
                pass: 'champishere',
            },
        });

        await transporter.sendMail({
            from: 'bbburhankamran@gmail.com',
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


