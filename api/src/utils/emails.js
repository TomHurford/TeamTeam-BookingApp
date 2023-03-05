
const nodemailer = require('nodemailer');
const qrcode = require('qrcode');

/*


How To Use:

Call mail() from the file using params to, subject and body.


*/

// let transporter = nodemailer.createTransport(
// `smtp://noreply@ticketopia.armtech.dev:(8N.J1NOI.U*@ticketopia.armtech.dev:587`);
// EMAIL : noreply@ticketopia.armtech.dev => PASSWORD : (8N.J1NOI.U*

const transporter = nodemailer.createTransport({
  host: "ticketopia.armtech.dev",
  port: 465,
  auth: {
    user: "noreply@ticketopia.armtech.dev",
    pass: "(8N.J1NOI.U*",
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const header = (subject) => {return "<h2>" + subject + "</h2><br/><hr/><br/>";}
const footer = "<br/><br/><footer>Ticketopia</footer>"

async function mail(to = 'junkbox@ticketopia.armtech.dev', subject = "test", body = "test", qrYes = false, qrcodes) {
    let qrattachments = [];
    // If do this it passes
    if (qrYes) {
        for (var qrdata of qrcodes) {
            const qrCodeDataURL = await qrcode.toDataURL(qrdata.qrData);
            qrattachments.push({
              filename: qrdata.String,
              content: qrCodeDataURL.split(';base64,').pop(),
              encoding: 'base64'
            });
        }
    }
    await transporter.sendMail({
        from: 'noreply@ticketopia.armtech.dev',
        to: to,
        subject: subject + ' | TickeTopia',
        html: header(subject) + body + footer,
        attachments: qrattachments
    });
}

module.exports = {
  mail,
};
