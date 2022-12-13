const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

module.exports = (email, subject, url, name) => {
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: `${subject} is your otp`,
    text: `Hello ${name} \n Thank you for join us. Please confirm your email by clicking on the following link ${url}`,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      console.log("Email not send");
    } else {
      console.log("Succesfully sending email");
      return "Succesfully sending email";
    }
  });
};
