const cloudinary = require("cloudinary").v2;

const API_KEY_CLOUDINARY = process.env.API_KEY_CLOUDINARY;
const API_SECRET_CLOUDINARY = process.env.API_SECRET_CLOUDINARY;

if (!(API_KEY_CLOUDINARY && API_SECRET_CLOUDINARY)) {
  throw new Error(
    "Please provide API_KEY_CLOUDINARY and API_SECRET_CLOUDINARY in .env"
  );
}

cloudinary.config({
  cloud_name: "dnyzscdim",
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
});

module.exports = cloudinary;
