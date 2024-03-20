const Order = require("../models/order.model");
const VoucherService = require("./voucher.service");

class OrderService {
  constructor() {
    this.voucherService = new VoucherService();
  }

  async create(body) {
    const order = await Order.create(body);

    return {
      message: "Đơn hàng đã được tạo thành công!",
      order,
    };
  }

  async getAll(userId) {
    const orders = await Order.find({
      user: userId,
    }).populate([
      "shippingAddress",
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
            path: "parentCategory",
            model: "Category",
          },
          {
            path: "childCategory",
            model: "Category",
          },
        ],
      },
    ]);

    return {
      orders,
      total: orders.length,
    };
  }

  async getById(id) {
    const order = await Order.findById(id).populate([
      "shippingAddress",
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
            path: "parentCategory",
            model: "Category",
          },
          {
            path: "childCategory",
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
}

module.exports = OrderService;
