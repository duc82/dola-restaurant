import UserService from "./user.service";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/error.util";
import User from "@/models/user.model";
import verifyGoogleToken from "@/utils/verifyGoogleToken.util";
import crypto from "crypto";
import Token from "@/models/token.model";
import logger from "@/utils/logger.util";
import { Types } from "mongoose";

class AuthService {
  constructor() {
    this.userService = new UserService();
    this.origin = process.env.ORIGIN_CLIENT;
    this.accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
    this.refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
    this.emailGoogle = process.env.EMAIL_GOOGLE;
  }

  async verifyFacebookToken(accessToken) {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=name,email&access_token=${accessToken}`
    );

    if (res.ok) {
      return res.json();
    }

    throw new CustomError({
      message: "Lỗi xác thực tài khoản Facebook",
      status: 400,
    });
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

  async loginGoogle(code, res) {
    const payload = await verifyGoogleToken(code);

    const filter = {
      email: payload.email,
    };

    logger.info(payload);

    const doc = {
      fullName: `${payload.given_name} ${payload.family_name}`,
      email: payload.email,
    };

    const user = await this.userService.findOneOrCreate(filter, doc, {
      exclude: "password",
    });

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
      secure: true,
      sameSite: "none",
      maxAge: this.refreshTokenExpiresIn,
    });

    return { message: "Đăng nhập thành công", user, accessToken };
  }

  async loginFacebook(accessToken, res) {
    const payload = await this.verifyFacebookToken(accessToken);
    console.log(accessToken);

    const user = await this.userService.findOneOrCreate(
      { email: payload.email },
      {
        fullName: payload.name,
        email: payload.email,
      },
      { exclude: "password" }
    );

    const userPayload = {
      userId: user._id,
      role: user.role,
    };

    const accessTokenJwt = await this.generateJwtToken(userPayload, {
      expiresIn: this.accessTokenExpiresIn / 1000,
    });

    const refreshToken = await this.generateJwtToken(userPayload, {
      expiresIn: this.refreshTokenExpiresIn / 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: this.refreshTokenExpiresIn,
    });

    return {
      message: "Đăng nhập thành công",
      user,
      accessToken: accessTokenJwt,
    };
  }

  async signUp(body, ipAddress) {
    const isUserExists = await this.userService.checkUserExists(
      body.email,
      body.phone
    );

    if (isUserExists) {
      throw new CustomError({
        message: "Email hoặc số điện thoại đã tồn tại.",
        status: 400,
      });
    }

    const user = await User.create({ ...body, ipAddress });

    const { password, ...data } = user.toObject();

    return {
      user: data,
      message: "Đăng ký tài khoản thành công",
    };
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
      secure: true,
      sameSite: "none",
      maxAge: this.refreshTokenExpiresIn,
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
      message: "Refresh token thành công",
    };
  }

  async forgotPassword(email) {
    const user = await User.findOne({
      email,
    })
      .populate("token")
      .select("_id email fullName token");

    if (!user) {
      throw new CustomError({ message: "Không tìm thấy email", status: 404 });
    }

    const newToken = crypto.randomBytes(32).toString("hex");
    const oneHour = 1000 * 60 * 60;

    const token = await Token.findByIdAndUpdate(
      user.token?._id ?? new Types.ObjectId(),
      {
        passwordResetToken: newToken,
        passwordResetTokenExpirationAt: new Date(Date.now() + oneHour),
      },
      {
        new: true,
        upsert: true,
      }
    );

    user.token = token._id;
    await user.save();

    await this.sendResetPasswordEmail({
      to: user.email,
      token: newToken,
      fullName: user.fullName,
    });

    return { message: "Gửi email thành công" };
  }

  async verifyPasswordResetToken(email, token) {
    if (!email || !token) {
      throw new CustomError({
        message: "Token không hợp lệ hoặc đã hết hạn",
        status: 401,
      });
    }

    const user = await User.findOne({
      email,
    })
      .populate("token")
      .select("token");

    if (
      !user ||
      user.token?.passwordResetToken !== token ||
      new Date() > user.token?.passwordResetTokenExpirationAt
    ) {
      throw new CustomError({
        message: "Token không hợp lệ hoặc đã hết hạn",
        status: 401,
        verified: false,
      });
    }

    return { verified: true };
  }

  async resetPassword(email, password) {
    const user = await User.findOne({
      email,
    }).select("token");

    if (!user) {
      throw new CustomError({
        message: "Người dùng không tồn tại!",
        status: 404,
      });
    }

    await Token.deleteOne({ _id: user.token });
    user.password = password;
    user.token = null;
    await user.save();

    return {
      message: "Đổi mật khẩu thành công",
    };
  }

  async sendVerifyEmail({ to, token, fullName }) {
    const mailOptions = {
      from: `"Dola Restaurant" <${this.emailGoogle}>`,
      to,
      subject: `Xác minh tài khoản Dola Restaurant`,
      html: `
    <p>Chào ${fullName},</p>
    <p>Vui lòng nhấn vào nút dưới đây để xác thực địa chỉ email:</p>
    <a href='${this.orgin}/xac-minh-email/${token}'>Xác thực email</a>
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
      from: `"Dola Restaurant" <${this.emailGoogle}>`,
      to,
      subject: `Thiết lập lại mật khẩu của tài khoản khách hàng`,
      html: `
      <p>Xin chào ${fullName},</p>
      <p>Anh/chị đã yêu cầu đổi mật khẩu tại <b>Dola Restaurant.<b></p>
      <p>Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé.</p>
      <a href='${this.origin}/doi-mat-khau/${to}/${token}'>Đặt lại mật khẩu</a>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  }
}

module.exports = AuthService;
