const { model, Schema } = require("mongoose");
const slugify = require("slugify");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    // subdocument nested
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorySchema.pre("save", function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name);
  }
  next();
});

const Category = model("Category", categorySchema);

module.exports = Category;
