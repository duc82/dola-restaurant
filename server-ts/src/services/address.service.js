const Address = require("../models/address.model");
const CustomError = require("../utils/error.util");
const User = require("../models/user.model");

class AddressService {
  async getAll() {
    const addresses = await Address.find().sort({ createdAt: -1 });
    return addresses;
  }

  async getCurrent(userId) {
    const user = await User.findById(userId)
      .populate({
        path: "addresses",
        options: { sort: { createdAt: -1 } },
      })
      .select("addresses");
    return user.addresses;
  }

  async create(body, userId) {
    const user = await User.findById(userId).select("addresses");

    if (user.addresses.length === 0) {
      body.isDefault = true;
    }

    if (body.isDefault && user.addresses.length > 0) {
      await Address.updateMany(
        { _id: { $in: user.addresses } },
        { isDefault: false }
      );
    }

    const address = await Address.create(body);

    user.addresses.push(address._id);

    await user.save();

    return {
      message: "Thêm địa chỉ mới thành công",
      address,
    };
  }

  async update(id, body, userId) {
    const user = await User.findById(userId).select("addresses");

    if (body.isDefault) {
      await Address.updateMany(
        { _id: { $in: user.addresses } },
        { isDefault: false }
      );
    }

    const updatedAddress = await Address.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedAddress) {
      throw new CustomError({
        message: "Không tìm thấy địa chỉ",
        status: 404,
      });
    }

    return {
      message: "Cập nhật địa chỉ thành công",
      address: updatedAddress,
    };
  }

  async delete(id, userId) {
    const address = await Address.findById(id);

    if (!address) {
      throw new CustomError({ message: "Không tìm thấy địa chỉ", status: 404 });
    }

    const user = await User.findById(userId).select("addresses");
    if (user) {
      user.addresses.pull(id);
      await user.save();
    }

    await Address.deleteOne({ _id: id });

    return { message: "Xóa địa chỉ thành công" };
  }
}

module.exports = AddressService;
