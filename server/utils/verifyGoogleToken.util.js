const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const clientIdGoogle = process.env.CLIENT_ID_GOOGLE;
const clientSecretGoogle = process.env.CLIENT_SECRET_GOOGLE;

const googleClient = new OAuth2(
  clientIdGoogle,
  clientSecretGoogle,
  "postmessage"
);

const verifyGoogleToken = async (code) => {
  const { tokens } = await googleClient.getToken(code); // exchange code for tokens
  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientIdGoogle,
  });
  return ticket.getPayload();
};

module.exports = verifyGoogleToken;
