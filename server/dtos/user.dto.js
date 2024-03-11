const Joi = require("joi");
const BaseDto = require("./index.dto");

class UserDto extends BaseDto {
  constructor() {
    super();
    this.fullName = Joi.string().min(2).max(50).required().messages({
      "string.empty": "Họ tên không được bỏ trống!",
      "string.min": "Họ tên cần tối thiểu 2 kí tự!",
      "string.max": "Họ tên tối đa 50 kí tự!",
    });
    this.email = Joi.string().email().message("Email không hợp lệ!").required();
    this.password = Joi.string().min(6).max(50).required().messages({
      "string.empty": "Mật khẩu không được bỏ trống!",
      "string.min": "Mật khẩu cần tối thiểu 6 kí tự!",
      "string.max": "Mật khẩu tối đa 50 kí tự!",
    });
    this.phone = Joi.string()
      .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
      .message("Số điện thoại không hợp lệ!")
      .required();
    this.role = Joi.string().valid("admin", "user");
  }

  get create() {
    return {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role,
    };
  }

  get updateCurrent() {
    return {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
    };
  }

  get update() {
    return {};
  }

  get changePassword() {
    return {
      oldPassword: this.password,
      newPassword: this.password,
    };
  }
}

module.exports = UserDto;
