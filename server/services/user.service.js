const User = require("../models/user.model");
const CustomError = require("../utils/error.util");
const Token = require("../models/token.model");
const Order = require("../models/order.model");
const Review = require("../models/review.model");
const Address = require("../models/address.model");

class UserService {
  async findOneOrCreate(filter, doc, { exclude }) {
    let user = await User.findOne(filter);
    if (!user) {
      user = await User.create(doc);
    }

    if (exclude) {
      delete user[exclude];
    }

    return user;
  }

  async checkUserExists(email, phone) {
    const isExists = await User.exists({
      $or: [
        { email },
        {
          phone,
        },
      ],
    });

    return isExists ? true : false;
  }

  async updateUser(id, update) {
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select(
      "-password"
    );
    return user;
  }

  async getCurrent(userId) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new CustomError({
        message: "Không tìm thấy người dùng",
        status: 404,
      });
    }

    return user;
  }

  async getAll(query) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          email: new RegExp(search, "i"),
        },
        {
          phone: new RegExp(search, "i"),
        },
        {
          fullName: new RegExp(search, "i"),
        },
      ];
    }

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-password")
      .sort({ createdAt: "desc" });

    const total = await User.countDocuments(filter);

    return { users, limit, total, skip, page };
  }

  async create(body, userAgent) {
    const isUserExists = await this.checkUserExists(body.email, body.phone);

    const device = userAgent.isMobile
      ? "Mobile"
      : userAgent.isTablet
      ? "Tablet"
      : "Desktop";

    if (isUserExists) {
      throw new CustomError({
        message: "Email hoặc số điện thoại đã tồn tại.",
        status: 400,
      });
    }

    const user = await User.create({ ...body, device });

    const { password, ...data } = user.toObject();

    return { user: data, message: "Thêm mới người dùng thành công" };
  }

  async updateCurrent(userId, body) {
    const emailExists = await User.findOne({
      email: body.email,
      _id: { $ne: userId },
    });

    if (emailExists) {
      throw new CustomError({
        message: "Email đã được sử dụng",
        status: 400,
      });
    }

    const phoneExists = await User.findOne({
      phone: body.phone,
      _id: { $ne: userId },
    });

    if (phoneExists) {
      throw new CustomError({
        message: "Số điện thoại đã được sử dụng",
        status: 400,
      });
    }

    const user = await this.updateUser(userId, {
      fullName: value.fullName,
      email: value.email,
      phone: value.phone,
    });

    if (!user) {
      throw new CustomError({
        message: "Cập nhật người dùng thất bại!",
        status: 400,
      });
    }

    return {
      message: "Cập nhật tài khoản thành công",
      user,
    };
  }

  async update(id, body) {
    const user = await this.updateUser(id, body);

    if (!user) {
      throw new CustomError({
        message: "Cập nhật người dùng thất bại!",
        status: 400,
      });
    }

    return { user, message: "Cập nhật người dùng thành công" };
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError({
        message: "Người dùng không tồn tại",
        status: 404,
      });
    }

    if (user.isHavePassword) {
      const isCorrectPassword = await user.comparePassword(oldPassword);
      if (!isCorrectPassword) {
        throw new CustomError({
          message: "Mật khẩu cũ không đúng",
          status: 400,
        });
      }
    }

    user.password = newPassword;
    await user.save();

    return { message: "Đổi mật khẩu thành công" };
  }

  async delete(id, userId) {
    if (id === userId) {
      throw new CustomError({
        message: "Không thể xóa tài khoản này",
        status: 400,
      });
    }

    const user = await User.findByIdAndDelete(id).select("token");

    await Promise.all([
      Token.deleteMany({ _id: user.token }),
      Order.deleteMany({ user: id }),
      Address.deleteMany({ user: id }),
      Review.deleteMany({ user: id }),
    ]);

    if (!user) {
      throw new CustomError({
        message: "Xóa người dùng thất bại",
        status: 400,
      });
    }

    return {
      message: "Xóa người dùng thành công",
    };
  }

  async deleteMany(ids, userId) {
    const users = await User.find({ _id: { $in: ids } }).select("email");

    if (!users.length) {
      throw new CustomError({
        message: "Xóa người dùng thất bại!",
        status: 400,
      });
    }

    const currentUser = users.find((user) => user._id.equals(userId));

    if (currentUser) {
      throw new CustomError({
        message: `Không thể xóa tài khoản ${currentUser.email}`,
        status: 400,
      });
    }

    await Promise.all([
      User.deleteMany({ _id: { $in: ids } }),
      Token.deleteMany({ _id: { $in: users.map((user) => user.token) } }),
      Order.deleteMany({ user: { $in: ids } }),
      Address.deleteMany({ user: { $in: ids } }),
      Review.deleteMany({ user: { $in: ids } }),
    ]);

    return {
      message: "Xóa người dùng thành công",
    };
  }
}

module.exports = UserService;
