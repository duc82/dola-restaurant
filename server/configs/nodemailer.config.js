const nodemailer = require("nodemailer");

const EMAIL_GOOGLE = process.env.EMAIL_GOOGLE;
const APP_PASSWORD_GOOGLE = process.env.APP_PASSWORD_GOOGLE;

if (!(EMAIL_GOOGLE && APP_PASSWORD_GOOGLE)) {
  throw new Error(
    "Please provide EMAIL_GOOGLE and APP_PASSWORD_GOOGLE in .env"
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_GOOGLE,
    pass: APP_PASSWORD_GOOGLE,
  },
});

module.exports = transporter;
