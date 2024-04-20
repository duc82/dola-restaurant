const Voucher = require("../models/voucher.model");
const CustomError = require("../utils/error.util");

class VoucherService {
  async create(body) {
    const voucherExists = await Voucher.findOne({ code: body.code });

    if (voucherExists) {
      throw new CustomError({ message: "Mã giảm giá đã tồn tại", status: 400 });
    }

    const voucher = await Voucher.create(body);

    return { message: "Mã giảm giá đã được tạo thành công", voucher };
  }

  async getAll() {
    const vouchers = await Voucher.find();

    return { message: "Danh sách mã giảm giá", vouchers };
  }

  async getById(id) {
    const voucher = await Voucher.findById(id);

    return voucher;
  }

  async update(id, body) {
    const voucher = await Voucher.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!voucher) {
      throw new CustomError({
        message: "Không tìm thấy mã giảm giá",
        status: 404,
      });
    }

    return { message: "Cập nhật mã giảm giá thành công", voucher };
  }

  async delete(id) {
    const voucher = await Voucher.findByIdAndDelete(id);

    if (!voucher) {
      throw new CustomError({
        message: "Xóa mã giảm giá thất bại",
        status: 404,
      });
    }

    return {
      message: "Xóa mã giảm giá thành công",
    };
  }

  async deleteMany(ids) {
    const vouchers = await Voucher.find({ _id: { $in: ids } });

    if (!vouchers.length) {
      throw new CustomError({
        message: "Xóa mã giảm giá thất bại",
        status: 404,
      });
    }

    await Voucher.deleteMany({ _id: { $in: ids } });

    return {
      message: "Xoa mã giảm giá thành công",
    };
  }
}

module.exports = VoucherService;
