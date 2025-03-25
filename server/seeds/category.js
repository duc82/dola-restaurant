const CategoryService = require("../services/category.service");
const categories = require("./jsons/categories.json");

const categoryService = new CategoryService();

module.exports = async () => {
  for (const category of categories) {
    const data = await categoryService.create(category);
    console.log(data);
  }
};
