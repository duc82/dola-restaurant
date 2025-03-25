const Joi = require("joi");

class BaseDto {
  id = Joi.string().required().messages({
    "string.empty": "Id không được bỏ trống!",
  });
  ids = Joi.array().items(this.id);
  limitNoDefault = Joi.number().min(1).max(100);
  limitDefault = this.limitNoDefault.default(5);
  page = Joi.number().min(1).default(1);
  search = Joi.string().allow("");

  get getById() {
    return Joi.object({
      id: this.id,
    });
  }

  get deleteMany() {
    return Joi.object({
      ids: this.ids,
    });
  }
}

module.exports = BaseDto;
