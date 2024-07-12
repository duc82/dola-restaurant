const Review = require("../models/review.model");
const Product = require("../models/product.model");
const CustomError = require("../utils/error.util");

class ReviewService {
  async getAll(query) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const reviews = await Review.find().limit(limit).skip(skip);

    const total = await Review.countDocuments();

    return {
      reviews,
      page,
      limit,
      total,
      skip,
    };
  }

  async create(user, body) {
    const { rating, comment, productId } = body;

    const product = await Product.findById(productId);
    const newReview = await Review.create({
      rating,
      comment,
      user: user.id,
      product: product._id,
    });

    product.reviews.push(newReview._id);
    await product.save();

    return { message: "Thêm mới đánh giá thành công", review: newReview };
  }

  async getByProduct(productId, query) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const product = await Product.findById(productId).select("avgRating");

    if (!product) {
      throw new CustomError({ message: "Product not found", status: 404 });
    }

    const avgRating = product.avgRating;

    const reviews = await Review.find({
      product: productId,
    })
      .limit(limit)
      .skip(skip);

    return {
      avgRating,
      reviews,
      page,
      limit,
    };
  }
}

module.exports = ReviewService;
