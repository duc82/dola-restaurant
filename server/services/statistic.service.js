const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

class StatisticService {
  async getStatistic() {
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUser: {
            $sum: 1,
          },
          totalDesktopUser: {
            $sum: {
              $cond: {
                if: { $eq: ["$device", "Desktop"] },
                then: 1,
                else: 0,
              },
            },
          },
          totalTabletUser: {
            $sum: {
              $cond: {
                if: { $eq: ["$device", "Tablet"] },
                then: 1,
                else: 0,
              },
            },
          },
          totalMobileUser: {
            $sum: {
              $cond: {
                if: { $eq: ["$device", "Mobile"] },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ]);
    const totalProduct = await Product.countDocuments();

    const profit = await Order.aggregate([
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
    ]);

    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: 1,
          },
        },
      },
    ]);

    const totalProfit = profit.length === 0 ? 0 : profit[0].total;
    const totalOrder = orders.length === 0 ? 0 : orders[0].total;
    const totalUser = users[0].totalUser;
    const totalDesktopUser = users[0].totalDesktopUser;
    const totalTabletUser = users[0].totalTabletUser;
    const totalMobileUser = users[0].totalMobileUser;

    return {
      totalUser,
      totalProduct,
      totalProfit,
      totalOrder,
      totalDesktopUser,
      totalTabletUser,
      totalMobileUser,
    };
  }
}

module.exports = StatisticService;
