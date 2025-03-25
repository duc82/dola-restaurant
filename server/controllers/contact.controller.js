const ContactService = require("../services/contact.service");
const asyncHandler = require("../middlewares/asyncHandler.middleware");

class ContactController {
  constructor() {
    this.contactService = new ContactService();
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deleteMany = asyncHandler(this.deleteMany.bind(this));
  }

  async getAll(req, res) {
    res.json(await this.contactService.getAll(req.query));
  }

  async create(req, res) {
    res.status(201).json(await this.contactService.create(req.body));
  }

  async update(req, res) {
    res.json(await this.contactService.update(req.params.id, req.body));
  }

  async delete(req, res) {
    res.json(await this.contactService.delete(req.params.id));
  }

  async deleteMany(req, res) {
    res.json(await this.contactService.deleteMany(req.body.ids));
  }
}

module.exports = ContactController;
