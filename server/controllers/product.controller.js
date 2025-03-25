const asyncHandler = require("../middlewares/asyncHandler.middleware");

const ProductService = require("../services/product.service");

class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getParentCategory = asyncHandler(this.getParentCategory.bind(this));
    this.getBySlug = asyncHandler(this.getBySlug.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deleteMany = asyncHandler(this.deleteMany.bind(this));
  }

  async getAll(req, res) {
    res.json(await this.productService.getAll(req.query));
  }

  async getParentCategory(req, res) {
    res.json(
      await this.productService.getParentCategory(req.params.slug, req.query)
    );
  }

  async getBySlug(req, res) {
    res.json(await this.productService.getBySlug(req.params.slug));
  }

  async create(req, res) {
    res.status(201).json(await this.productService.create(req.body));
  }

  async update(req, res) {
    res.json(await this.productService.update(req.params.id, req.body));
  }

  async delete(req, res) {
    res.json(await this.productService.delete(req.params.id));
  }

  async deleteMany(req, res) {
    res.json(await this.productService.deleteMany(req.body.ids));
  }
}

module.exports = new ProductController();
