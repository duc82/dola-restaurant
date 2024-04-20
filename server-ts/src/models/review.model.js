const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: Number,
    comment: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
