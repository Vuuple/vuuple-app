const nodemailer = require('nodemailer');

module.exports.send_email = (to, from, subject, body, attachements,attachName) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'support@vuuple.com', // generated ethereal user
      pass: 'jqbdwidflweizscy' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: from, // sender address
    to: to, // list of receivers separated with comma
    subject: subject, // Subject line
    text: body, // plain text body
    html: body, // html body
    attachments:   { 
      // use URL as an attachment
      path: attachements
    }///attachements
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw err;
    } else {
      return info;
    }
  });
};
