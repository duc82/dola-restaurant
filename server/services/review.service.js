const Review = require("../models/review.model");
const Product = require("../models/product.model");
const CustomError = require("../utils/error.util");

class ReviewService {
  async getAll(query) {
    const { page, limit, product, search } = query;

    const skip = (page - 1) * limit;

    const filter = {};

    if (product) {
      filter.product = product;
    }

    if (search) {
      filter.content = new RegExp(search, "i");
    }

    const reviews = await Review.find(filter)
      .populate(["user", "product"])
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: "desc",
      });

    const total = await Review.countDocuments(filter);

    return {
      reviews,
      page,
      limit,
      total,
      skip,
    };
  }

  async create(user, body) {
    const product = await Product.findById(body.product);

    if (!product) {
      throw new CustomError({ message: "Product not found", status: 404 });
    }

    const review = await Review.create({
      ...body,
      user: user.userId,
    });

    review.populate(["user", "product"]);

    return { message: "Thêm mới đánh giá thành công", review };
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
