const Joi = require("joi");
const BaseDto = require("./index.dto");

class ReviewDto extends BaseDto {
  get getAll() {
    return Joi.object({
      page: this.page,
      limit: this.limitDefault,
      search: this.search,
      product: Joi.string().allow(""),
    });
  }
}

module.exports = ReviewDto;
