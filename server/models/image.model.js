const { model, Schema } = require("mongoose");

const imageSchema = new Schema(
  {
    url: String,
  },
  { timestamps: false, versionKey: false }
);

const Image = model("Image", imageSchema);

module.exports = Image;
