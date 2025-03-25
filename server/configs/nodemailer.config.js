const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const EMAIL_GOOGLE = process.env.EMAIL_GOOGLE;
const CLIENT_ID_GOOGLE_GMAIL = process.env.CLIENT_ID_GOOGLE_GMAIL;
const CLIENT_SECRET_GOOGLE_GMAIL = process.env.CLIENT_SECRET_GOOGLE_GMAIL;
const REFRESH_TOKEN_GOOGLE_GMAIL = process.env.REFRESH_TOKEN_GOOGLE_GMAIL;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    CLIENT_ID_GOOGLE_GMAIL,
    CLIENT_SECRET_GOOGLE_GMAIL,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN_GOOGLE_GMAIL,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_GOOGLE,
      accessToken,
      clientId: CLIENT_ID_GOOGLE_GMAIL,
      clientSecret: CLIENT_SECRET_GOOGLE_GMAIL,
      refreshToken: REFRESH_TOKEN_GOOGLE_GMAIL,
    },
  });

  return transporter;
};

module.exports = createTransporter;
