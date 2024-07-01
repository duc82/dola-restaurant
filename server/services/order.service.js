const Order = require("../models/order.model");
const CustomError = require("../utils/error.util.js");

class OrderService {
  async create(body) {
    const order = await Order.create(body);

    return {
      message: "Đơn hàng đã được tạo thành công!",
      order,
    };
  }

  async getAll(query) {
    const { limit, page, search } = query;

    const filter = {};

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate([
        "shippingAddress",
        "vouchers",
        {
          path: "user",
          select: "-password",
        },
        {
          path: "products.product",
          model: "Product",
          populate: [
            {
              path: "images",
              model: "Image",
            },
            {
              path: "category",
              model: "Category",
            },
          ],
        },
      ]);

    const total = await Order.countDocuments(filter);

    return {
      orders,
      total,
      limit,
      page,
      skip,
    };
  }

  async getById(id) {
    const order = await Order.findById(id).populate([
      "shippingAddress",
      "vouchers",
      {
        path: "user",
        select: "-password",
      },
      {
        path: "products.product",
        model: "Product",
        populate: [
          {
            path: "images",
            model: "Image",
          },
          {
            path: "category",
            model: "Category",
          },
        ],
      },
    ]);

    return {
      message: "Đơn hàng đã được tải thành công!",
      order,
    };
  }

  async update(id, body) {
    const order = await Order.findByIdAndUpdate(id, body, { new: true });

    if (!order) {
      throw new CustomError({
        message: "Không tìm thấy đơn hàng!",
        status: 404,
      });
    }

    return {
      message: "Đơn hàng đã được cập nhật thành công!",
      order,
    };
  }
}

module.exports = OrderService;
