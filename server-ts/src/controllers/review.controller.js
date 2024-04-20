const asyncHandler = require("../middlewares/asyncHandler.middleware");
const Product = require("../models/product.model");
const Review = require("../models/review.model");

class ReviewController {
  constructor() {
    this.createReview = asyncHandler(this.createReview.bind(this));
    this.updateReview = asyncHandler(this.updateReview.bind(this));
  }

  async createReview(req, res) {
    const { userId } = req.user;
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);
    const newReview = await Review.create({
      rating,
      comment,
      user: userId,
      product: product._id,
    });

    product.reviews.push(newReview._id);
    await product.save();

    res
      .status(201)
      .json({ message: "Thêm mới đánh giá thành công", review: newReview });
  }

  async updateReview(req, res) {}
}

module.exports = new ReviewController();
