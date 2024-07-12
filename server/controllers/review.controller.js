const asyncHandler = require("../middlewares/asyncHandler.middleware");
const ReviewService = require("../services/review.service");

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.getByProduct = asyncHandler(this.getByProduct.bind(this));
  }

  async getAll(req, res) {
    res.json(await this.reviewService.getAll(req.query));
  }

  async create(req, res) {
    res.status(201).json(await this.reviewService.create(req.user, req.body));
  }

  async update(req, res) {}

  async getByProduct(req, res) {
    res.json(
      await this.reviewService.getByProduct(req.params.productId, req.query)
    );
  }
}

module.exports = new ReviewController();
