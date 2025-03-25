const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: Number,
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
