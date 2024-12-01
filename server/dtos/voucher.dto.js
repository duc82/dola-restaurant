const Joi = require("joi");
const BaseDto = require("./index.dto");

class VoucherDto extends BaseDto {
  constructor() {
    super();
    this.code = Joi.string().required().messages({
      "string.empty": "Mã giảm giá không được bỏ trống!",
    });
    this.discount = Joi.number().required().messages({
      "number.empty": "Giá trị giảm giá không được bỏ trống!",
    });
    this.minimumCost = Joi.number().required().messages({
      "number.empty": "Giá trị đơn hàng tối thiểu không được bỏ trống!",
    });
    this.isActive = Joi.boolean();
  }

  get create() {
    return Joi.object({
      code: this.code,
      discount: this.discount,
      minimumCost: this.minimumCost,
      isActive: this.isActive,
    });
  }

  get getAll() {
    return Joi.object({
      page: this.page,
      limit: this.limitNoDefault,
      search: this.search,
    });
  }

  get update() {
    return Joi.object({
      code: this.code,
      discount: this.discount,
      minimumCost: this.minimumCost,
      isActive: this.isActive,
    });
  }
}

module.exports = VoucherDto;
