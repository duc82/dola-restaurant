const User = require("../models/user.model");
const CustomError = require("../utils/error.util");
const Address = require("../models/address.model");
const Token = require("../models/token.model");

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
      "-password -passwordResetToken -passwordResetTokenExpirationAt"
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

  async getAll(search, page, limit) {
    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-password")
      .sort({ createdAt: -1 })
      .populate("addresses");
    const total = await User.countDocuments(filter);

    return { users, limit, total };
  }

  async create(body) {
    const isUserExists = await this.checkUserExists(body.email, body.phone);

    if (isUserExists) {
      throw new CustomError({
        message: "Email hoặc số điện thoại đã tồn tại.",
        status: 400,
      });
    }

    const user = await User.create(body);

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

  async changePassword({ userId, oldPassword, newPassword }) {
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
        message: "Không thể xóa tài khoản của chính mình",
        status: 400,
      });
    }

    const user = await User.findByIdAndDelete(id);

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
    const users = await User.find({ _id: { $in: ids } }).select(
      "-password -passwordResetToken -passwordResetTokenExpirationAt"
    );

    if (!users.length) {
      throw new CustomError({
        message: "Xóa người dùng thất bại!",
        status: 400,
      });
    }

    if (users.some((user) => user._id === userId)) {
      throw new CustomError({
        message: "Không thể xóa tài khoản của chính mình",
        status: 400,
      });
    }

    await Promise.all([
      User.deleteMany({ _id: { $in: ids } }),
      Token.deleteMany({ _id: { $in: users.map((user) => user.token) } }),
      Address.deleteMany({
        _id: { $in: users.flatMap((user) => user.addresses) },
      }),
    ]);

    return {
      message: "Xóa người dùng thành công",
    };
  }
}

module.exports = UserService;
