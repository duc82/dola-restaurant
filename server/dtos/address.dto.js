const Joi = require("joi");
const UserDto = require("./user.dto");

class AddressDto extends UserDto {
  ward = Joi.string().required().messages({
    "string.empty": "Phường, xã không được bỏ trống!"
  });
  district = Joi.string().required().messages({
    "string.empty": "Quận không được bỏ trống!"
  });
  province = Joi.string().required().messages({
    "string.empty": "Tỉnh, thành phố không được bỏ trống!"
  });
  detail = Joi.string().required().messages({
    "string.empty": "Địa chỉ chi tiết không được bỏ trống!"
  });
  isDefault = Joi.boolean();
}

module.exports = AddressDto;
