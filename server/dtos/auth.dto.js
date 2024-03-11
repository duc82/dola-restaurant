const Joi = require("joi");
const UserDto = require("./user.dto");

class AuthDto extends UserDto {
  constructor() {
    super();
    this.code = Joi.string().required().messages({
      "string.empty": "Code không được bỏ trống!",
    });
    this.accessToken = Joi.string().required().messages({
      "string.empty": "AccessToken không được bỏ trống!",
    });
  }

  get signUp() {
    return {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      password: this.password,
    };
  }

  get login() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  get forgotPassword() {
    return {
      email: this.email,
    };
  }

  get verifyPasswordResetToken() {
    return {
      token: this.token,
    };
  }

  get resetPassword() {
    return {
      token: this.token,
      newPassword: this.password,
    };
  }

  get loginGoogle() {
    return {
      code: this.code,
    };
  }

  get loginFacebook() {
    return {
      accessToken: this.accessToken,
    };
  }
}

module.exports = AuthDto;
