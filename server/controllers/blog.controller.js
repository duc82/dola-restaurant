const asyncHandler = require("../middlewares/asyncHandler.middleware");
const BlogService = require("../services/blog.service");

class BlogController {
  constructor() {
    this.blogService = new BlogService();
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getBySlug = asyncHandler(this.getBySlug.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deleteMany = asyncHandler(this.deleteMany.bind(this));
  }

  async getAll(req, res) {
    res.json(await this.blogService.getAll(req.query));
  }

  async getBySlug(req, res) {
    res.json(await this.blogService.getBySlug(req.params.slug));
  }

  async create(req, res) {
    res.status(201).json(await this.blogService.create(req.body));
  }

  async update(req, res) {
    res.json(await this.blogService.update(req.params.id, req.body));
  }

  async delete(req, res) {
    res.json(await this.blogService.delete(req.params.id));
  }

  async deleteMany(req, res) {
    res.json(await this.blogService.deleteMany(req.body.ids));
  }
}

module.exports = new BlogController();
