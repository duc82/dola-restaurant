const Order = require("../models/order.model");
const CustomError = require("../utils/error.util.js");

class OrderService {
  async create(body) {
    const order = await Order.create(body);

    return {
      message: "Đơn hàng đã được tạo thành công!",
      order
    };
  }

  async getAll(userId) {
    const orders = await Order.find({
      user: userId
    })
      .sort({ createdAt: -1 })
      .populate([
        "shippingAddress",
        {
          path: "user",
          select: "-password"
        },
        {
          path: "products.product",
          model: "Product",
          populate: [
            {
              path: "images",
              model: "Image"
            },

            {
              path: "parentCategory",
              model: "Category"
            },
            {
              path: "childCategory",
              model: "Category"
            }
          ]
        }
      ]);

    return {
      orders,
      total: orders.length
    };
  }

  async getById(id) {
    const order = await Order.findById(id).populate([
      "shippingAddress",
      {
        path: "user",
        select: "-password"
      },
      {
        path: "products.product",
        model: "Product",
        populate: [
          {
            path: "images",
            model: "Image"
          },
          {
            path: "parentCategory",
            model: "Category"
          },
          {
            path: "childCategory",
            model: "Category"
          }
        ]
      }
    ]);

    return {
      message: "Đơn hàng đã được tải thành công!",
      order
    };
  }

  async update(id, body) {
    const order = await Order.findByIdAndUpdate(id, body, { new: true });

    if (!order) {
      throw new CustomError({
        message: "Không tìm thấy đơn hàng!",
        status: 404
      });
    }

    return {
      message: "Đơn hàng đã được cập nhật thành công!",
      order
    };
  }
}

module.exports = OrderService;
