const Category = require("../models/category.model");
const Product = require("../models/product.model");
const CustomError = require("../utils/error.util");

class CategoryService {
  async getById(id) {
    return await Category.findById(id).populate("parentCategory");
  }

  async getAll(query) {
    const { page, limit, search } = query;

    const filter = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};

    if (limit) {
      const skip = (page - 1) * limit;

      const categories = await Category.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("parentCategory");

      const total = await Category.countDocuments(filter);

      return { categories, total, page, limit, skip };
    }

    return await Category.find(filter).populate("parentCategory");
  }

  async getAllParents() {
    return await Category.find({ parentCategory: null });
  }

  async getAllChilds() {
    return await Category.find({ parentCategory: { $ne: null } });
  }

  async create(body) {
    const category = await Category.create(body);

    await category.populate("parentCategory");

    return {
      message: "Tạo danh mục sản phẩm thành công",
      category,
    };
  }

  async update(id, body, file) {
    const update = {
      name: body.name,
      image: file ? file.path : body.image,
      description: body.description,
      parentCategory: body.parentCategory || null,
    };

    const category = await Category.findByIdAndUpdate(id, update, {
      new: true,
    }).populate("parentCategory");

    if (!category) {
      throw new CustomError({
        message: "Không tìm thấy danh mục sản phẩm",
        status: 404,
      });
    }

    return {
      message: "Cập nhật danh mục sản phẩm thành công",
      category,
    };
  }

  async delete(id) {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new CustomError({
        message: "Không tìm thấy danh mục sản phẩm",
        status: 404,
      });
    }

    await Product.deleteMany({
      $or: [{ childCategory: id }, { parentCategory: id }],
    });

    // check if category is parent category
    if (!category.parentCategory) {
      await Category.deleteMany({ parentCategory: id });
    }

    return {
      message: "Xóa danh mục sản phẩm thành công",
    };
  }

  async deleteMany(ids) {
    const categories = await Category.find({ _id: { $in: ids } });

    if (categories.length === 0) {
      throw new CustomError({
        message: "Không tìm thấy danh mục sản phẩm",
        status: 404,
      });
    }

    await Category.deleteMany({ _id: { $in: ids } });
    await Product.deleteMany({
      $or: [{ childCategory: { $in: ids } }, { parentCategory: { $in: ids } }],
    });

    return {
      message: "Xóa danh mục sản phẩm thành công",
    };
  }
}

module.exports = CategoryService;
