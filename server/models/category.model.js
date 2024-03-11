const { model, Schema } = require("mongoose");
const toLowerCaseNonAccentVietnamese = require("../utils/toLowerCaseNonAccentVietnamese.util");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    slug: String,
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    // subdocument nested
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorySchema.index({
  name: 1,
});

categorySchema.pre("save", function (next) {
  if (this.name && !this.slug) {
    this.slug = toLowerCaseNonAccentVietnamese(
      this.name.replace(/[-\s]+/g, "-")
    );
  }
  next();
});

const Category = model("Category", categorySchema);

module.exports = Category;
