const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
