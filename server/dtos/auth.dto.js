const Joi = require("joi");
const UserDto = require("./user.dto");

class AuthDto extends UserDto {
  code = Joi.string().required().messages({
    "string.empty": "Code không được bỏ trống!"
  });
  accessToken = Joi.string().required().messages({
    "string.empty": "AccessToken không được bỏ trống!"
  });

  get signUp() {
    return Joi.object({
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      password: this.password
    });
  }

  get login() {
    return Joi.object({
      email: this.email,
      password: this.password
    });
  }

  get forgotPassword() {
    return Joi.object({
      email: this.email
    });
  }

  get verifyPasswordResetToken() {
    return Joi.object({
      token: this.token
    });
  }

  get resetPassword() {
    return Joi.object({
      token: this.token,
      newPassword: this.password
    });
  }

  get loginGoogle() {
    return Joi.object({
      code: this.code
    });
  }

  get loginFacebook() {
    return Joi.object({
      accessToken: this.accessToken
    });
  }
}

module.exports = AuthDto;
