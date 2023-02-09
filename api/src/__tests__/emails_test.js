const mailer = require('../utils/emails.js');

// Testing email systems

describe('Mail', () => {
    test('Running basic email to my own email', async () => {
        mailer.mail(to='amohabbat02@gmail.com',subject="test",body="test");
    })
})