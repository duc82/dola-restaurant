const Contact = require("../models/contact.model");
const CustomError = require("../utils/error.util");

class ContactService {
  async getAll(query) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: "desc" });

    return {
      contacts,
      skip,
      page,
      limit,
    };
  }

  async create(body) {
    const contact = await Contact.create(body);
    return {
      contact,
      message: "Thêm liên hệ thành công",
    };
  }

  async update(id, body) {
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) {
      throw new CustomError({
        message: "Không tìm thấy liên hệ",
        status: 404,
      });
    }

    return {
      message: "Cập nhật liên hệ thành công",
      contact,
    };
  }

  async delete(id) {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      throw new CustomError({
        message: "Không tìm thấy liên hệ",
        status: 404,
      });
    }

    return {
      message: "Xóa liên hệ thành công",
    };
  }

  async deleteMany(ids) {
    const contacts = await Contact.find({
      _id: { $in: ids },
    });

    if (!contacts.length) {
      throw new CustomError({
        message: "Không tìm thấy liên hệ",
        status: 404,
      });
    }

    await Contact.deleteMany({ _id: { $in: ids } });

    return {
      contacts,
      message: "Xóa liên hệ thành công",
    };
  }
}

module.exports = ContactService;
