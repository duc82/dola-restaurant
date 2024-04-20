const asyncHandler = require("../middlewares/asyncHandler.middleware");
const OrderService = require("../services/order.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.create = asyncHandler(this.create.bind(this));
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getById = asyncHandler(this.getById.bind(this));
  }

  async create(req, res) {
    res.status(201).json(await this.orderService.create(req.body));
  }

  async getAll(req, res) {
    res.status(200).json(await this.orderService.getAll(req.user.userId));
  }

  async getById(req, res) {
    res.status(200).json(await this.orderService.getById(req.params.id));
  }
}

module.exports = new OrderController();
