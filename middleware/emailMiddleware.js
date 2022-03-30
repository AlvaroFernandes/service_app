const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email) => {
  console.log(email);
  const msg = {
    to: email,
    from: "fernandes.alvaro@gmail.com",
    subject: "Forgot Password Service APP",
    text: "test de envio de email",
    html: "<strong> email </strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendEmail;
