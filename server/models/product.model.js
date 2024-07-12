const { Schema, model } = require("mongoose");
const slug = require("slug");

const productSchema = new Schema(
  {
    title: {
      type: String,
      index: true,
    },
    slug: {
      type: String,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    price: Number,
    discountPercent: {
      type: Number,
      default: 0,
    },

    discountedPrice: {
      type: Number,
      default: function () {
        return this.price - (this.price * this.discountPercent) / 100;
      },
    },

    stock: Number,
    taste: {
      type: String,
      enum: ["mặn", "ngọt", "chua", "cay"],
    },
    size: {
      type: String,
      enum: ["nhỏ", "vừa", "lớn"],
    },
    description: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// before save
productSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slug(this.title);
  }

  next();
});

// before update
productSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  const update = this.getUpdate();

  if (update.title && !update.slug) {
    this.slug = slug(update.title);
  }

  next();
});

const Product = model("Product", productSchema);

module.exports = Product;
