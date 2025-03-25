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
    const { limit, page, search, userId } = query;

    const skip = (page - 1) * limit;

    const filter = {};

    if (userId) {
      filter.user = userId;
    }

    const orders = await Order.find(filter)
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
      ])
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: "desc" });

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
    const order = await Order.findByIdAndUpdate(id, body, {
      new: true,
    }).populate([
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

  async delete(id) {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      throw new CustomError({
        message: "Không tìm thấy đơn hàng!",
        status: 404,
      });
    }

    return {
      message: "Đơn hàng đã được xóa thành công!",
    };
  }

  async deleteMany(ids) {
    const orders = await Order.deleteMany({ _id: { $in: ids } });

    if (!orders.deletedCount) {
      throw new CustomError({
        message: "Không tìm thấy đơn hàng!",
        status: 404,
      });
    }

    return {
      message: "Đơn hàng đã được xóa thành công!",
    };
  }
}

module.exports = OrderService;
