const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AddressService = require("../services/address.service");

class AddressController {
  constructor() {
    this.addressService = new AddressService();
    this.getByUserId = asyncHandler(this.getByUserId.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
  }

  async getByUserId(req, res) {
    res
      .status(200)
      .json(await this.addressService.getByUserId(req.user.userId));
  }

  async create(req, res) {
    res
      .status(201)
      .json(await this.addressService.create(req.body, req.user.userId));
  }

  async update(req, res) {
    res
      .status(200)
      .json(await this.addressService.update(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await this.addressService.delete(req.params.id));
  }
}

module.exports = new AddressController();
