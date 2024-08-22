const BaseDto = require("./index.dto");
const Joi = require("joi");

class ProductDto extends BaseDto {
  price = Joi.string();
  taste = Joi.string();
  size = Joi.string();
  sort = Joi.string();
  categorySlug = Joi.string();

  get getAll() {
    return Joi.object({
      limit: this.limitDefault,
      page: this.page,
      search: this.search,
      price: this.price,
      tastte: this.taste,
      size: this.size,
      sort: this.sort,
      categorySlug: this.categorySlug,
    });
  }

  get getParentCategory() {
    return Joi.object({
      limit: this.limitDefault,
      page: this.page,
    });
  }
}

module.exports = ProductDto;
