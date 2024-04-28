const Category = require("../models/category.model");
const Image = require("../models/image.model");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const CustomError = require("../utils/error.util");

class ProductService {
  async create(body) {
    const { category, ...data } = body;
    const childCate = await Category.findById(body.category);

    if (!childCate) {
      throw new CustomError({
        message: "Danh mục sản phẩm không tồn tại",
        status: 404,
      });
    }

    const images = await Image.insertMany(
      body.images.map((image) => ({ url: image }))
    );

    const product = await Product.create({
      ...data,
      childCategory: childCate._id,
      parentCategory: childCate.parentCategory,
      images,
    });

    await product.populate(["childCategory", "parentCategory", "images"]);

    return {
      message: "Thêm sản phẩm mới thành công",
      product,
    };
  }

  async getAll(query) {
    const { cost, taste, size, sort, categorySlug, search, page, limit } =
      query;
    const skip = (page - 1) * limit;

    const filter = {};

    if (taste || size || cost || categorySlug || search) {
      filter.$and = [];

      if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });
        filter.$and.push({
          $or: [
            { parentCategory: category?._id },
            { childCategory: category?._id },
          ],
        });
      }

      if (search) {
        const regex = new RegExp(search, "i");

        filter.$and.push({
          title: regex,
        });
      }

      if (taste) {
        const tastes = taste.split("-");
        filter.$and.push({ $or: tastes.map((t) => ({ taste: t })) });
      }

      if (size) {
        const sizes = size.split("-");
        filter.$and.push({ $or: sizes.map((s) => ({ size: s })) });
      }

      if (cost) {
        const costs = cost.split("-");
        filter.$and.push({ $or: costs.map((c) => ({ cost: JSON.parse(c) })) });
      }
    }

    const products = await Product.find(filter)
      .populate(["parentCategory", "childCategory", "images"])
      .skip(skip)
      .limit(limit)
      .sort(sort ? [sort.split("-")] : null);

    const total = await Product.countDocuments(filter);

    return { products, limit, skip, total, page };
  }

  async getBySlug(slug) {
    const product = await Product.findOne({
      slug,
    }).populate(["parentCategory", "childCategory", "images"]);

    if (!product) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    return product;
  }

  async update(id, body, files) {
    const { imagesToDelete, ...update } = body;

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
    }).populate(["parentCategory", "childCategory"]);

    if (!product) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    if (imagesToDelete?.length) {
      await Image.deleteMany({ _id: { $in: imagesToDelete } });
      product.images = product.images.filter(
        (image) => !imagesToDelete.includes(image)
      );
    }

    if (files?.length) {
      const images = await Image.insertMany(
        files.map((file) => ({ url: file.path }))
      );
      product.images = [...product.images, ...images];
    }

    await Promise.all([product.populate("images"), product.save()]);

    return {
      message: "Cập nhật sản phẩm thành công",
      product,
    };
  }

  async delete(id) {
    const product = await Product.findById(id).select("images reviews");

    if (!product) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    await Promise.all([
      Product.deleteOne({ _id: id }),
      Image.deleteMany({ _id: { $in: product.images } }),
      Review.deleteMany({ _id: { $in: product.reviews } }),
    ]);

    return {
      message: "Xóa sản phẩm thành công",
    };
  }

  async deleteMany(ids) {
    const products = await Product.find({ _id: { $in: ids } }).select(
      "images reviews"
    );

    if (products.length === 0) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    await Promise.all([
      Product.deleteMany({ _id: { $in: ids } }),
      Image.deleteMany({ _id: { $in: products.flatMap((p) => p.images) } }),
      Review.deleteMany({ _id: { $in: products.flatMap((p) => p.reviews) } }),
    ]);

    return {
      message: "Xóa sản phẩm thành công",
    };
  }
}

module.exports = ProductService;
