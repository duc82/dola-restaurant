const connectDB = require("../configs/db.config");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Image = require("../models/image.model");
const blogs = require("./data/blogs.json");
const products = require("./data/products.json");
const categories = require("./data/categories.json");

class Seed {
  async blog() {
    const datas = await Blog.insertMany(blogs);
    console.log(datas);
  }

  async user() {
    console.log("User");
  }

  async product() {
    const count = await Product.count();
    if (count > 0) {
      await Product.deleteMany();
      console.log("Xoa tat ca san pham thang cong");
    }

    const promises = products.map(async (p) => {
      const { images, ...product } = p;

      const newImages = await Image.insertMany(images);

      const newProduct = await Product.create({
        ...product,
        images: newImages.map((image) => image._id),
      });

      await newProduct.populate("images");

      return newProduct;
    });

    const datas = await Promise.all(promises);
    console.log(datas);
  }
}

const seed = new Seed();
const arg = process.argv.slice(2)[0];

connectDB().then(async () => {
  switch (arg) {
    case "blog":
      await seed.blog();
      break;
    case "user":
      await seed.user();
      break;
    case "product":
      await seed.product();
      break;
    case "category":
      await seed.category();
      break;
    default:
      break;
  }

  process.exit();
});
