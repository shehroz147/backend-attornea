const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')

exports.sendEmail = async (email, text) => {


    //    npm install--save @sendgrid/mail

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    // javascript



    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email, // Change to your recipient
            from: 'info@attornea.com', // Change to your verified sender
            subject: 'Email Verification',
            text: text,
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })


        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.sendgrid.net',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: "apikey",
        //         pass: "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",
        //     },
        // });

        // await transporter.sendMail({
        //     from: 'info@attornea.com',
        //     to: email,
        //     subject: 'Confirmation email',
        //     text: text,
        // });
        // console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};


