
const nodemailer = require('nodemailer');

/*


How To Use:

Call mail() from the file using params to, subject and body.


*/



// let transporter = nodemailer.createTransport(
    // `smtp://noreply@ticketopia.armtech.dev:(8N.J1NOI.U*@ticketopia.armtech.dev:587`);
// EMAIL : noreply@ticketopia.armtech.dev => PASSWORD : (8N.J1NOI.U*

const transporter = nodemailer.createTransport({
    host: 'ticketopia.armtech.dev',
    port: 465,
    auth: {
        user: 'noreply@ticketopia.armtech.dev',
        pass: '(8N.J1NOI.U*'
    },
    tls: {
        rejectUnauthorized:false
    }
});

const header = (subject) => {return "<h2>" + subject + "</h2><br/><hr/><br/>";}
const footer = "<br/><br/><footer>Ticketopia</footer>"

async function mail(to='junkbox@tiketopia.armtech.dev',subject="test",body="test") {
    await transporter.sendMail({
        from: 'noreply@ticketopia.armtech.dev',
        to: to,
        subject: subject,
        html: header(subject) + body + footer
    });
}

module.exports = {
     mail
}