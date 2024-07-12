const { Schema, model } = require("mongoose");
const slug = require("slug");

const blogSchema = new Schema(
  {
    title: String,
    slug: String,
    description: String,
    image: String,
  },
  { timestamps: true, versionKey: false }
);

// before save
blogSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slug(this.title);
  }
  next();
});

// before update
blogSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  const update = this.getUpdate();

  if (update.title && !update.slug) {
    this.slug = slug(update.title);
  }

  next();
});

const Blog = model("Blog", blogSchema);

module.exports = Blog;
