const ProductService = require("../services/product.service");

const products = require("./jsons/products.json");

const productService = new ProductService();

module.exports = async () => {
  for (const product of products) {
    const data = await productService.create(product);
    console.log(data);
  }
};
