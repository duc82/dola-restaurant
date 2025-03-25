const Joi = require("joi");
const BaseDto = require("./index.dto");

class BlogDto extends BaseDto {
  get getAll() {
    return Joi.object({
      page: this.page,
      limit: this.limitNoDefault,
      search: this.search,
    });
  }
}

module.exports = BlogDto;
