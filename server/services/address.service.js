const Address = require("../models/address.model");
const CustomError = require("../utils/error.util");

class AddressService {
  async getCurrent(userId) {
    const addresses = await Address.find({
      user: userId
    }).sort({ createdAt: -1 });

    return addresses;
  }

  async create(body, userId) {
    const count = await Address.countDocuments({ user: userId });

    if (count === 0) {
      body.isDefault = true;
    }

    if (body.isDefault && count > 0) {
      await Address.updateOne({ isDefault: true }, { isDefault: false });
    }

    const address = await Address.create({ ...body, user: userId });

    return {
      message: "Thêm địa chỉ mới thành công",
      address
    };
  }

  async update(id, body) {
    if (body.isDefault) {
      await Address.updateOne({ isDefault: true }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(id, body, {
      new: true
    });

    if (!updatedAddress) {
      throw new CustomError({
        message: "Không tìm thấy địa chỉ",
        status: 404
      });
    }

    return {
      message: "Cập nhật địa chỉ thành công",
      address: updatedAddress
    };
  }

  async delete(id) {
    const address = await Address.findById(id);

    if (!address) {
      throw new CustomError({
        message: "Không tìm thấy địa chỉ",
        status: 404
      });
    }

    await Address.deleteOne({ _id: id });

    return { message: "Xóa địa chỉ thành công" };
  }
}

module.exports = AddressService;
