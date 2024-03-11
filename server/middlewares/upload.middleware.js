const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary.config");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Dola Restaurant",
    public_id: (_req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    // file.mimetype = image/[png|jpg|webp|svg|gif]
    const filetype = file.mimetype.split("/")[1];

    if (
      filetype === "png" ||
      filetype === "jpeg" ||
      filetype === "jpg" ||
      filetype === "svg" ||
      filetype === "gif" ||
      filetype === "webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Không phải định dạng hình ảnh!"));
    }
  },
});

module.exports = upload;
