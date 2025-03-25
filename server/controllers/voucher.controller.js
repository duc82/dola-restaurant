const VoucherService = require("../services/voucher.service");
const asyncHandler = require("../middlewares/asyncHandler.middleware");

class VoucherController {
  constructor() {
    this.voucherService = new VoucherService();
    this.create = asyncHandler(this.create.bind(this));
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getByCode = asyncHandler(this.getByCode.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deleteMany = asyncHandler(this.deleteMany.bind(this));
  }

  async create(req, res) {
    res.status(201).json(await this.voucherService.create(req.body));
  }

  async getAll(req, res) {
    res.json(await this.voucherService.getAll(req.query));
  }

  async getByCode(req, res) {
    res.json(
      await this.voucherService.getByCode(req.params.code, +req.query.amount)
    );
  }

  async update(req, res) {
    res.json(await this.voucherService.update(req.params.id, req.body));
  }

  async delete(req, res) {
    res.json(await this.voucherService.delete(req.params.id));
  }

  async deleteMany(req, res) {
    res.json(await this.voucherService.deleteMany(req.body.ids));
  }
}

module.exports = new VoucherController();
