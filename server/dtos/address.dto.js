const Joi = require("joi");
const UserDto = require("./user.dto");

class AddressDto extends UserDto {
  constructor() {
    super();
    this.ward = Joi.string().required().messages({
      "string.empty": "Phường, xã không được bỏ trống!",
    });
    this.district = Joi.string().required().messages({
      "string.empty": "Quận không được bỏ trống!",
    });
    this.province = Joi.string().required().messages({
      "string.empty": "Tỉnh, thành phố không được bỏ trống!",
    });
    this.detail = Joi.string().required().messages({
      "string.empty": "Địa chỉ chi tiết không được bỏ trống!",
    });
    this.isDefault = Joi.boolean();
  }
}

module.exports = AddressDto;
