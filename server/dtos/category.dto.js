const Joi = require("joi");
const BaseDto = require("./index.dto");

class CategoryDto extends BaseDto {
  get getAll() {
    return Joi.object({
      page: this.page,
      limit: this.limitNoDefault,
      search: this.search,
      nested: Joi.boolean().default(true),
    });
  }
}

module.exports = CategoryDto;
