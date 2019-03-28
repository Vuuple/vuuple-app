const nodemailer = require('nodemailer');

module.exports.send_email = (email, subject, body, attachements) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'support@vuuple.com', // generated ethereal user
      pass: 'Vuuple2$$##' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Vuuple App" <support@vuuple.com>', // sender address
    to: email, // list of receivers separated with comma
    subject: subject, // Subject line
    text: body, // plain text body
    html: body, // html body
    attachments: attachements
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw err;
    }
    else {
      return info;
    }
  });
};
