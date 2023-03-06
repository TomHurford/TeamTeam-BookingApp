
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
  host: 'ticketopia.armtech.dev',
  port: 465,
  auth: {
    user: 'noreply@ticketopia.armtech.dev',
    pass: '(8N.J1NOI.U*',
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const header = (subject) => {
  return '<h2>' + subject + '</h2><br/><hr/><br/>';
};
const footer = '<br/><br/><footer>Ticketopia</footer>';

/**
 * Mail function to send emails
 * @param {emailAddress} to Who to send the email to
 * @param {emailSubject} subject What the subject of the email is
 * @param {emailBody} body What the body of the email is
 * @param {boolean} qrYes If the email should have a QR code attached
 * @param {QRCode} qrcodes The QR code to attach
 */
async function mail(
    to = 'junkbox@ticketopia.armtech.dev',
    subject = 'test',
    body = 'test',
    qrYes = false,
    qrcodes) {
  const qrattachments = [];
  // If do this it passes
  if (qrYes) {
    for (const qrdata of qrcodes) {
      const qrCodeDataURL = await qrcode.toDataURL(qrdata.qrData);
      qrattachments.push({
        filename: qrdata.String,
        content: qrCodeDataURL.split(';base64,').pop(),
        encoding: 'base64',
      });
    }
  }
  await transporter.sendMail({
    from: 'noreply@ticketopia.armtech.dev',
    to: to,
    subject: subject + ' | TickeTopia',
    html: header(subject) + body + footer,
    attachments: qrattachments,
  });
}

module.exports = {
  mail,
};
