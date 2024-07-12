const Joi = require("joi");
const BaseDto = require("./index.dto");

class ReviewDto extends BaseDto {
  get getAll() {
    return Joi.object({
      page: this.page,
      limit: this.limitDefault,
    });
  }
}

module.exports = ReviewDto;
