const { model, Schema } = require("mongoose");
const slug = require("slug");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    slug: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    // subdocument nested
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

categorySchema.pre("save", function (next) {
  if (this.name && !this.slug) {
    this.slug = slug(this.title);
  }
  next();
});

const Category = model("Category", categorySchema);

module.exports = Category;
