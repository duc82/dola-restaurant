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
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: {
            $sum: {
              $cond: {
                if: { $eq: ["$isPaid", true] },
                then: "$total",
                else: 0,
              },
            },
          },
          totalOrder: {
            $sum: 1,
          },
        },
      },
    ]);

    const totalProfit = orders[0].totalProfit;
    const totalOrder = orders[0].totalOrder;
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
