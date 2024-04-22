const BaseDto = require("./index.dto");
const Joi = require("joi");

class ProductDto extends BaseDto {
  cost = Joi.string();
  taste = Joi.string();
  size = Joi.string();
  sort = Joi.string();
  categorySlug = Joi.string();

  get getAll() {
    return Joi.object({
      limit: this.limit,
      page: this.page,
      serach: this.search,
      cost: this.cost,
      tastte: this.taste,
      size: this.size,
      sort: this.sort,
      categorySlug: this.categorySlug
    });
  }
}

module.exports = ProductDto;
