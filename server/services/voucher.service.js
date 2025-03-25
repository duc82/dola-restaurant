const Voucher = require("../models/voucher.model");
const CustomError = require("../utils/error.util");

class VoucherService {
  async create(body) {
    const voucher = await Voucher.create(body);

    return { message: "Tạo voucher thành công", voucher };
  }

  async getAll(query) {
    const { page, limit, search } = query;

    const filter = {};
    if (search) {
      filter.code = { $regex: search, $options: "i" };
    }

    if (limit) {
      const skip = (page - 1) * limit;

      const vouchers = await Voucher.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: "desc" });

      const total = await Voucher.countDocuments(filter);

      return { vouchers, total, page, limit, skip };
    } else {
      filter.expireAt = { $gte: new Date() };
    }

    return Voucher.find(filter);
  }

  async getByCode(code, amount) {
    const voucher = await Voucher.findOne({
      code,
      expireAt: { $gte: new Date() },
      quantity: { $gt: 0 },
      minAmount: { $lte: amount },
    });

    if (!voucher) {
      throw new CustomError({
        message: "Voucher không hợp lệ hoặc đã hết hạn",
        status: 400,
      });
    }

    return voucher;
  }

  async update(id, body) {
    const voucher = await Voucher.findByIdAndUpdate(id, body, {
      new: true,
    });

    return { message: "Cập nhật voucher thành công", voucher };
  }

  async delete(id) {
    const voucher = await Voucher.findByIdAndDelete(id);

    if (!voucher) {
      throw new CustomError({
        message: "Không tìm thấy voucher",
        status: 404,
      });
    }

    return { message: "Xóa voucher thành công" };
  }

  async deleteMany(ids) {
    const vouchers = await Voucher.find({ _id: { $in: ids } });

    if (!vouchers.length) {
      throw new CustomError({
        message: "Xóa người dùng thất bại!",
        status: 400,
      });
    }

    await Voucher.deleteMany({ _id: { $in: ids } });

    return {
      message: "Xóa voucher thành công",
    };
  }
}

module.exports = VoucherService;
