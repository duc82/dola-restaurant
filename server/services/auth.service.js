require("dotenv").config();
const transporter = require("../configs/nodemailer.config");
const UserService = require("./user.service");
const jwt = require("jsonwebtoken");
const util = require("util");
const CustomError = require("../utils/error.util");
const User = require("../models/user.model");

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

class AuthService {
  constructor() {
    this.userService = new UserService();
    this.origin = process.env.ORIGIN_CLIENT;
    this.accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
    this.refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
  }

  async verifyFacebookToken(accessToken) {
    const res = await fetch(
      `https://graph.facebook.com/v16.0/me?fields=name,email&access_token=${accessToken}`
    );

    if (res.ok) {
      return res.json();
    }

    return null;
  }

  async generateJwtToken(payload, options) {
    return sign(payload, process.env.SECRET_KEY_JWT, options);
  }

  async verifyJwtToken(token) {
    const { iat, exp, ...payload } = await verify(
      token,
      process.env.SECRET_KEY_JWT
    );
    return payload;
  }

  async login(email, password, ipAddress, res) {
    const user = await User.findOne({
      email,
    }).populate("addresses");

    const isCorrectPassword = await user?.comparePassword(password);

    if (!user || !isCorrectPassword) {
      throw new CustomError({
        message: "Email hoặc mật khẩu không hợp lệ",
        status: 400,
      });
    }

    user.ipAddress = ipAddress;
    await user.save();

    const userPayload = {
      userId: user._id,
      role: user.role,
    };

    const accessToken = await this.generateJwtToken(userPayload, {
      expiresIn: this.accessTokenExpiresIn / 1000,
    });

    const refreshToken = await this.generateJwtToken(userPayload, {
      expiresIn: this.refreshTokenExpiresIn / 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    delete user.password;

    return { accessToken, user, message: "Đăng nhập thành công" };
  }

  async refreshToken(refreshToken) {
    const userPayload = await this.verifyJwtToken(refreshToken);

    const user = await User.findById(userPayload.userId);

    if (!user) {
      throw new CustomError({
        message: "Tài khoản không tồn tại",
        status: 400,
      });
    }

    const newAccessToken = await this.generateJwtToken(userPayload, {
      expiresIn: this.accessTokenExpiresIn / 1000,
    });

    return {
      accessToken: newAccessToken,
      user,
      message: "Refresh token thành công",
    };
  }

  async sendVerifyEmail({ to, token, fullName }) {
    const mailOptions = {
      from: `"Dola Restaurant" <${process.env.EMAIL_GOOGLE}>`,
      to,
      subject: `Xác minh tài khoản Dola Restaurant`,
      html: `
    <p>Chào ${fullName},</p>
    <p>Vui lòng nhấn vào nút dưới đây để xác thực địa chỉ email:</p>
    <a href='${process.env.ORIGIN_CLIENT}/xac-minh-email/${token}'>Xác thực email</a>
    <p>
    Email xác nhận này chỉ có hiệu lực trong <b>1h.</b></p>
    <p>
    Xin cảm ơn,<br>
    Dola Restaurant
    </p>
    `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  }

  async sendResetPasswordEmail({ to, token, fullName }) {
    const mailOptions = {
      from: `"Dola Restaurant" <${process.env.EMAIL_GOOGLE}>`,
      to,
      subject: `Thiết lập lại mật khẩu của tài khoản khách hàng`,
      html: `
      <p>Xin chào ${fullName},</p>
      <p>Anh/chị đã yêu cầu đổi mật khẩu tại <b>Dola Restaurant.<b></p>
      <p>Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé.</p>
      <a href='${process.env.ORIGIN_CLIENT}/doi-mat-khau/${to}/${token}'>Đặt lại mật khẩu</a>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  }
}

module.exports = AuthService;
