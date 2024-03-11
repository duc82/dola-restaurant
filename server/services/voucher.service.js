const Voucher = require("../models/voucher.model");
const client = require("../configs/redis.config");
const CustomError = require("../utils/error.util");

class VoucherService {
  async create(body) {
    const voucherExists = await Voucher.findOne({ code: body.code });

    if (voucherExists) {
      throw new CustomError({ message: "Mã giảm giá đã tồn tại", status: 400 });
    }

    const voucher = await Voucher.create(body);

    const cachedVouchers = await client.get("vouchers");

    if (cachedVouchers) {
      const vouchers = JSON.parse(cachedVouchers);
      vouchers.push(voucher);

      // get expired time
      const ttl = await client.ttl("vouchers");

      await client.setEx("vouchers", ttl, JSON.stringify(vouchers));
    }

    return { message: "Mã giảm giá đã được tạo thành công", voucher };
  }

  async getAll() {
    const cachedVouchers = await client.get("vouchers");

    if (cachedVouchers) {
      return {
        message: "Danh sách mã giảm giá",
        vouchers: JSON.parse(cachedVouchers),
      };
    }

    const vouchers = await Voucher.find();

    await client.setEx("vouchers", 3600, JSON.stringify(vouchers));

    return { message: "Danh sách mã giảm giá", vouchers };
  }

  async getById(id) {
    const cachedVoucher = await client.get(`voucher:${id}`);

    if (cachedVoucher) {
      return JSON.parse(cachedVoucher);
    }

    const voucher = await Voucher.findById(id);

    await client.setEx(`voucher:${id}`, 3600, JSON.stringify(voucher));

    return voucher;
  }

  async update(id, body) {
    const voucher = await Voucher.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!voucher) {
      throw new CustomError({
        message: "Không tìm thấy mã giảm giá",
        status: 404,
      });
    }

    const cachedVouchers = await client.get("vouchers");

    if (cachedVouchers) {
      const vouchers = JSON.parse(cachedVouchers);
      const index = vouchers.findIndex((voucher) => voucher._id === id);
      if (index !== -1) {
        vouchers[index] = voucher;
        const ttl = await client.ttl("vouchers");
        await client.setEx("vouchers", ttl, JSON.stringify(vouchers));
      }
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

    const cachedVouchers = await client.get("vouchers");

    if (cachedVouchers) {
      const vouchers = JSON.parse(cachedVouchers);
      const index = vouchers.findIndex((voucher) => voucher._id === id);
      if (index !== -1) {
        vouchers.splice(index, 1);
        const ttl = await client.ttl("vouchers");
        await client.setEx("vouchers", ttl, JSON.stringify(vouchers));
      }
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

    const cachedVouchers = await client.get("vouchers");

    if (cachedVouchers) {
      const vouchers = JSON.parse(cachedVouchers);
      const newVouchers = vouchers.filter(
        (voucher) => !ids.includes(voucher._id)
      );
      const ttl = await client.ttl("vouchers");
      await client.setEx("vouchers", ttl, JSON.stringify(newVouchers));
    }

    return {
      message: "Xoa mã giảm giá thành công",
    };
  }
}

module.exports = VoucherService;
