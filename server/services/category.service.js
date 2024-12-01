const Category = require("../models/category.model");
const Product = require("../models/product.model");
const CustomError = require("../utils/error.util");

class CategoryService {
  async getById(id) {
    return Category.findById(id).populate("parent");
  }

  async getAll(query) {
    const { page, limit, search, nested } = query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (limit) {
      const skip = (page - 1) * limit;

      const categories = await Category.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("parent")
        .select("-childrens")
        .sort({ createdAt: "desc" });

      const total = await Category.countDocuments(filter);

      return { categories, total, page, limit, skip };
    }

    return Category.find(nested ? { ...filter, parent: null } : filter)
      .populate(nested ? "childrens" : null)
      .select(nested ? null : "-childrens");
  }

  async getChildrens() {
    return Category.find({
      parent: {
        $ne: null,
      },
    });
  }

  async getParents() {
    return Category.find({ parent: null });
  }

  async create(body) {
    const category = await Category.create(body);
    const parent = await Category.findById(category.parent);

    if (parent) {
      parent.childrens.push(category);
      await parent.save();
    }

    await category.populate("parent");

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
      $or: [{ childCategory: id }, { parent: id }],
    });

    // check if category is parent category
    if (!category.parent) {
      await Category.deleteMany({ parent: id });
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

    await Category.deleteMany({});
    await Product.deleteMany({
      $or: [{ childCategory: { $in: ids } }, { parentCategory: { $in: ids } }],
    });

    return {
      message: "Xóa danh mục sản phẩm thành công",
    };
  }
}

module.exports = CategoryService;
