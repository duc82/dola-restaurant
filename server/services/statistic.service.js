const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

class StatisticService {
  async getStatistic() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const limit = 7;

    const [users, totalUser, products, totalProduct, profit, totalOrder] =
      await Promise.all([
        User.aggregate([
          {
            $group: {
              _id: {
                day: { $dayOfMonth: "$createdAt" },
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
              },
              total: {
                $sum: 1,
              },
              createdAt: {
                $first: "$createdAt",
              },
            },
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
          {
            $limit: limit,
          },
        ]),
        User.countDocuments(),
        Product.aggregate([
          {
            $group: {
              _id: {
                day: { $dayOfMonth: "$createdAt" },
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
              },
              total: {
                $sum: 1,
              },
              createdAt: {
                $first: "$createdAt",
              },
            },
          },
          {
            $limit: limit,
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
        ]),
        Product.countDocuments(),
        Order.aggregate([
          {
            $match: {
              paidAt: { $ne: null },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$total",
              },
            },
          },
        ]),
        Order.countDocuments(),
      ]);

    const lastMonthOrder = await Order.aggregate([
      {
        $match: {
          paidAt: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const profitDatas = await Order.aggregate([
      {
        $match: {
          paidAt: {
            $gte: new Date(year, month, 1),
            $lt: new Date(year, month + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$paidAt" },
            month: { $month: "$paidAt" },
            year: { $year: "$paidAt" },
          },
          total: {
            $sum: "$total",
          },
          createdAt: {
            $first: "$createdAt",
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

    const totalProfit = profit[0]?.total || 0;
    const lastMonthProfit = lastMonthOrder[0]?.total || 0;

    return {
      users,
      totalUser,
      products,
      totalProduct,
      totalProfit,
      totalOrder,
      lastMonthProfit,
      profitDatas,
    };
  }
}

module.exports = StatisticService;
