const { generateJwtToken } = require("../utils/jwt.util");
require("dotenv").config();
const transporter = require("../configs/nodemailer.config");
const UserService = require("./user.service");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const CustomError = require("../utils/error.util");

class AuthService {
  constructor() {
    this.userService = new UserService();
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

  async attachCookieToResponse({ res, name, payload, tokenExpires }) {
    const tokenExpiresSecond = tokenExpires / 1000;

    const token = await generateJwtToken(payload, {
      expiresIn: tokenExpiresSecond,
    });

    res.cookie(name, token, {
      httpOnly: true,
      maxAge: tokenExpires,
      secure: true,
      sameSite: "None",
    });

    return token;
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
