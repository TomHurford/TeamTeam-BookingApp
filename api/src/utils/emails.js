const nodemailer = require('nodemailer');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "ibnjalal47@gmail.com",
        pass: "Deliverus1"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
    to: "amohabbat02@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

mail = (from="no-reply@ticketopia.ddns.net",to='amohabbat02@gmail.com',subject="test",body="test") => {
    // const transporter = nodemailer.createTransport({sendmail: true}, {
    // from: from,
    // to: to,
    // subject: subject,
    // });
    // transporter.sendMail({text: body});

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

module.exports = {
    mail,
}
