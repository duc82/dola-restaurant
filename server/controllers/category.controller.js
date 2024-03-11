const asyncHandler = require("../middlewares/asyncHandler.middleware");
const CategoryService = require("../services/category.service");

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deletMany = asyncHandler(this.deletMany.bind(this));
  }

  async create(req, res) {
    res.status(201).json(await this.categoryService.create(req.body, req.file));
  }

  async getAll(req, res) {
    res.json(await this.categoryService.getAll());
  }

  async update(req, res) {
    res.json(
      await this.categoryService.update(req.params.id, req.body, req.file)
    );
  }

  async delete(req, res) {
    res.json(await this.categoryService.delete(req.params.id));
  }

  async deletMany(req, res) {
    res.json(await this.categoryService.deleteMany(req.body.ids));
  }
}

module.exports = new CategoryController();
