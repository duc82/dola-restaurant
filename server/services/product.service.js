const Category = require("../models/category.model");
const Image = require("../models/image.model");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const CustomError = require("../utils/error.util");
const CategoryService = require("../services/category.service");

class ProductService {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async create(body) {
    const category = await this.categoryService.getById(body.category);

    if (!category) {
      throw new CustomError({
        message: "Danh mục sản phẩm không tồn tại",
        status: 404,
      });
    }

    const images = await Image.insertMany(
      body.images.map((image) => ({ url: image }))
    );

    const product = await Product.create({
      ...body,
      category,
      images,
    });

    await product.populate(["images", "parent"]);

    return {
      message: "Thêm sản phẩm mới thành công",
      product,
    };
  }

  async getAll(query) {
    const { cost, taste, size, sort, search, page, limit } = query;
    const skip = (page - 1) * limit;

    const filter = {};

    if (taste || size || cost || search) {
      filter.$and = [];

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
      .populate([
        {
          path: "category",
          populate: {
            path: "parent",
          },
        },
        { path: "images" },
      ])
      .skip(skip)
      .limit(limit)
      .sort(sort ? [sort.split("-")] : null);

    const total = await Product.countDocuments(filter);

    return { products, limit, skip, total, page };
  }

  async getParentCategory(slug, query) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const parentCate = await Category.findOne({ slug, parent: null }).populate(
      "childrens"
    );

    const childCateIds = parentCate.childrens.map((cate) => cate._id);

    const products = await Product.find({
      category: {
        $in: childCateIds,
      },
    })
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "category",
          populate: {
            path: "parent",
          },
        },
        { path: "images" },
      ]);

    return { products, limit, skip, page };
  }

  async getBySlug(slug) {
    const product = await Product.findOne({
      slug,
    }).populate([
      {
        path: "category",
        populate: {
          path: "parent",
        },
      },
      { path: "images" },
    ]);

    if (!product) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    return product;
  }

  async update(id, body) {
    const product = await Product.findById(id).populate(["images", "category"]);

    if (!product) {
      throw new CustomError({
        message: "Không tìm thấy sản phẩm",
        status: 404,
      });
    }

    const { category, images, ...data } = body;

    if (category !== product.category._id.toString()) {
      const newCategory = await Category.findById(body.category);
      if (!newCategory) {
        throw new CustomError({
          message: "Danh mục sản phẩm không tồn tại",
          status: 404,
        });
      }
      data.category = newCategory._id;
    }

    if (images.length > 0) {
      const newImages = await Image.insertMany(
        images.map((image) => ({ url: image }))
      );
      await Image.deleteMany({
        _id: { $in: product.images.map((image) => image._id) },
      });
      data.images = newImages;
    }

    product.set(data);

    await product.save();

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
