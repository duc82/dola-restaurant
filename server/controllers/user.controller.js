const asyncHandler = require("../middlewares/asyncHandler.middleware");
const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.getCurrent = asyncHandler(this.getCurrent.bind(this));
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.updateCurrent = asyncHandler(this.updateCurrent.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.changePassword = asyncHandler(this.changePassword.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deleteMany = asyncHandler(this.deleteMany.bind(this));
  }

  async getCurrent(req, res) {
    res.json(await this.userService.getCurrent(req.user.userId));
  }

  async getAll(req, res) {
    const search = req.query.search || "";
    const page = req.query.page > 0 ? +req.query.page : 1;
    const limit = req.query.limit > 0 ? +req.query.limit : 0;

    res.json(await this.userService.getAll(search, page, limit));
  }

  async create(req, res) {
    res.status(201).json(await this.userService.create(req.body));
  }

  async updateCurrent(req, res) {
    res.json(await this.userService.updateCurrent(req.user.userId, req.body));
  }

  async update(req, res) {
    res.json(await this.userService.update(req.params.id, req.body));
  }

  async changePassword(req, res) {
    res.json(
      await this.userService.changePassword({
        userId: req.user.userId,
        ...req.body,
      })
    );
  }

  async delete(req, res) {
    res.json(await this.userService.delete(req.params.id));
  }

  async deleteMany(req, res) {
    res.json(await this.userService.deleteMany(req.body.ids));
  }
}

const userController = new UserController();

module.exports = userController;
