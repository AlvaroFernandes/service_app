// const nodemailer = require("nodemailer");
// const sendgridtransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.EMAIL_KEY);

const sendEmail = (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  sgMail.send(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
