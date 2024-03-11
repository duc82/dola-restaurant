const asyncHandler = require("../middlewares/asyncHandler.middleware");
const crypto = require("crypto");
const User = require("../models/user.model");
const CustomError = require("../utils/error.util");
const verifyGoogleToken = require("../utils/verifyGoogleToken.util");
const { verifyJwtToken } = require("../utils/jwt.util");
const Token = require("../models/token.model");
const { default: mongoose } = require("mongoose");
const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
require("dotenv").config();

class AuthController {
  constructor(origin, accessTokenExpiresIn, refreshTokenExpiresIn) {
    this.origin = origin;
    this.accessTokenExpiresIn = accessTokenExpiresIn;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    this.authService = new AuthService();
    this.userService = new UserService();

    this.loginGoogle = asyncHandler(this.loginGoogle.bind(this));
    this.loginFacebook = asyncHandler(this.loginFacebook.bind(this));
    this.login = asyncHandler(this.login.bind(this));
    this.signUp = asyncHandler(this.signUp.bind(this));
    this.logout = asyncHandler(this.logout.bind(this));
    this.refreshToken = asyncHandler(this.refreshToken.bind(this));
    this.forgotPassword = asyncHandler(this.forgotPassword.bind(this));
    this.verifyPasswordResetToken = asyncHandler(
      this.verifyPasswordResetToken.bind(this)
    );
    this.resetPassword = asyncHandler(this.resetPassword.bind(this));
  }

  async loginGoogle(req, res) {
    const payload = await verifyGoogleToken(req.body.code);

    const filter = {
      email: payload.email,
    };

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

    await attachCookieToResponse({
      res,
      name: "accessToken",
      payload: userPayload,
      tokenExpires: this.accessTokenExpiresIn,
    });
    await attachCookieToResponse({
      res,
      name: "refreshToken",
      payload: userPayload,
      tokenExpires: this.refreshTokenExpiresIn,
    });

    res.status(200).json({ message: "Đăng nhập thành công", user });
  }

  async loginFacebook(req, res) {
    const payload = await verifyFacebookToken(req.body.accessToken);

    const user = await this.findOneOrCreate(
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

    await attachCookieToResponse({
      res,
      name: "accessToken",
      payload: userPayload,
      tokenExpires: this.accessTokenExpiresIn,
    });
    await attachCookieToResponse({
      res,
      name: "refreshToken",
      payload: userPayload,
      tokenExpires: this.refreshTokenExpiresIn,
    });

    res.status(200).json({ message: "Đăng nhập thành công", user });
  }

  async login(req, res) {
    const user = await User.findOne({
      email: req.body.email,
    }).populate("addresses");

    const isCorrectPassword = await user?.comparePassword(req.body.password);

    if (!user || !isCorrectPassword) {
      throw new CustomError({
        message: "Email hoặc mật khẩu không hợp lệ",
        status: 400,
      });
    }

    const userPayload = {
      userId: user._id,
      role: user.role,
    };

    const accessToken = await this.authService.attachCookieToResponse({
      res,
      name: "accessToken",
      payload: userPayload,
      tokenExpires: this.accessTokenExpiresIn,
    });
    const refreshToken = await this.authService.attachCookieToResponse({
      res,
      name: "refreshToken",
      payload: userPayload,
      tokenExpires: this.refreshTokenExpiresIn,
    });

    res.cookie("isLoggedIn", true, {
      secure: true,
      sameSite: "None",
      maxAge: this.refreshTokenExpiresIn,
    });

    const { password, ...data } = user.toObject();

    res.status(200).json({ message: "Đăng nhập thành công", user: data });
  }

  async signUp(req, res) {
    const isUserExists = await this.userService.checkUserExists(
      req.body.email,
      req.body.phone
    );

    if (isUserExists) {
      throw new CustomError({
        message: "Email hoặc số điện thoại đã tồn tại.",
        status: 400,
      });
    }

    const user = await User.create(req.body);

    const { password, ...data } = user.toObject();

    res.status(201).json({
      message: "Đăng ký tài khoản thành công",
      user: data,
    });
  }

  async logout(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isLoggedIn");
    res.status(200).json({ message: "Đăng xuất thành công!" });
  }

  async refreshToken(req, res) {
    try {
      const userPayload = await verifyJwtToken(req.cookies.refreshToken);

      await this.authService.attachCookieToResponse({
        res,
        name: "accessToken",
        payload: userPayload,
        tokenExpires: this.accessTokenExpiresIn,
      });

      res.status(200).json({ message: "Refresh token thành công" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async forgotPassword(req, res) {
    const user = await User.findOne({
      email: req.body.email,
    })
      .populate("token")
      .select("_id email fullName token");

    if (!user) {
      throw new CustomError({ message: "Không tìm thấy email", status: 404 });
    }

    const newToken = crypto.randomBytes(32).toString("hex");
    const oneHour = 1000 * 60 * 60;

    const token = await Token.findByIdAndUpdate(
      user.token?._id ?? new mongoose.Types.ObjectId(),
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

    await sendResetPasswordEmail({
      to: user.email,
      token: newToken,
      fullName: user.fullName,
    });

    res.status(200).json({
      message: "Gửi email thành công",
    });
  }

  async verifyPasswordResetToken(req, res) {
    const { email, token } = req.body;

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

    res.status(200).json({ verified: true });
  }

  async resetPassword(req, res) {
    const user = await User.findOne({
      email: req.body.email,
    }).select("token");

    if (!user) {
      throw new CustomError({
        message: "Người dùng không tồn tại!",
        status: 404,
      });
    }

    await Token.deleteOne({ _id: user.token });
    user.password = req.body.password;
    user.token = null;
    await user.save();

    res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  }
}

const authController = new AuthController(
  process.env.ORIGIN_CLIENT,
  process.env.ACCESS_TOKEN_EXPIRES_IN,
  process.env.REFRESH_TOKEN_EXPIRES_IN
);

module.exports = authController;
