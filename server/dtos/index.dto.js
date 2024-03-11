const Joi = require("joi");

class BaseDto {
  constructor() {
    this.id = Joi.string().required().messages({
      "string.empty": "Id không được bỏ trống!",
    });
    this.ids = Joi.array().items(this.id);
  }

  get getById() {
    return {
      id: this.id,
    };
  }

  get deleteMany() {
    return {
      ids: this.ids,
    };
  }
}

module.exports = BaseDto;
