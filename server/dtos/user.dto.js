const Joi = require("joi");
const BaseDto = require("./index.dto");

class UserDto extends BaseDto {
  fullName = Joi.string().min(2).max(50).required().messages({
    "string.empty": "Họ tên không được bỏ trống!",
    "string.min": "Họ tên cần tối thiểu 2 kí tự!",
    "string.max": "Họ tên tối đa 50 kí tự!",
  });
  email = Joi.string().email().message("Email không hợp lệ!").required();
  password = Joi.string().min(6).max(50).required().messages({
    "string.empty": "Mật khẩu không được bỏ trống!",
    "string.min": "Mật khẩu cần tối thiểu 6 kí tự!",
    "string.max": "Mật khẩu tối đa 50 kí tự!",
  });
  phone = Joi.string()
    .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
    .message("Số điện thoại không hợp lệ!")
    .required();
  role = Joi.string().valid("admin", "user");

  get create() {
    return Joi.object({
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role,
    });
  }

  get getAll() {
    return Joi.object({
      page: this.page,
      limit: this.limitDefault,
      search: this.search,
    });
  }

  get updateCurrent() {
    return Joi.object({
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
    });
  }

  get update() {
    return Joi.object({});
  }

  get changePassword() {
    return Joi.object({
      oldPassword: this.password,
      newPassword: this.password,
    });
  }
}

module.exports = UserDto;
