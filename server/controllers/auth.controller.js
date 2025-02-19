const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AuthService = require("../services/auth.service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
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
    res
      .status(200)
      .json(
        await this.authService.loginGoogle(req.body.code, req.useragent, res)
      );
  }

  async loginFacebook(req, res) {
    res
      .status(200)
      .json(
        await this.authService.loginFacebook(
          req.body.accessToken,
          req.userAgent,
          res
        )
      );
  }

  async signUp(req, res) {
    res
      .status(201)
      .json(await this.authService.signUp(req.body, req.useragent));
  }

  async login(req, res) {
    res
      .status(200)
      .json(
        await this.authService.login(req.body.email, req.body.password, res)
      );
  }

  async logout(_req, res) {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Đăng xuất thành công" });
  }

  async refreshToken(req, res) {
    res
      .status(200)
      .json(await this.authService.refreshToken(req.cookies.refreshToken));
  }

  async forgotPassword(req, res) {
    res.status(200).json(await this.authService.forgotPassword(req.body.email));
  }

  async verifyPasswordResetToken(req, res) {
    res
      .status(200)
      .json(
        await this.authService.verifyPasswordResetToken(
          req.body.email,
          req.body.token
        )
      );
  }

  async resetPassword(req, res) {
    res
      .status(200)
      .json(
        await this.authService.resetPassword(req.body.email, req.body.password)
      );
  }
}

module.exports = new AuthController();
