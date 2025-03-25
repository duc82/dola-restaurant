const Blog = require("../models/blog.model");
const CustomError = require("../utils/error.util");

class BlogService {
  async getAll(query) {
    const { page, limit, search } = query;

    const filter = {};
    if (search) {
      filter.slug = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;
    const blogs = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: "desc" });
    const total = await Blog.countDocuments(filter);
    return {
      blogs,
      total,
      skip,
      page,
      limit,
    };
  }

  async getBySlug(slug) {
    const blog = await Blog.findOne({
      slug,
    });

    if (!blog) {
      throw new CustomError({
        message: "Không tìm thấy blog",
        status: 404,
      });
    }

    return blog;
  }

  async create(body) {
    const blog = await Blog.create(body);

    return { blog, message: "Thêm mới blog thành công" };
  }

  async update(id, body) {
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });

    if (!blog) {
      throw new CustomError({
        message: "Không tìm thấy blog",
        status: 404,
      });
    }

    return { message: "Cập nhật blog thành công", blog };
  }

  async delete(id) {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      throw new CustomError({
        message: "Không tìm thấy blog",
        status: 404,
      });
    }

    return { message: "Xóa blog thành công" };
  }

  async deleteMany(ids) {
    const blogs = await Blog.find({ _id: { $in: ids } });

    if (!blogs.length) {
      throw new CustomError({
        message: "Không tìm thấy blog!",
        status: 404,
      });
    }

    await Blog.deleteMany({
      _id: { $in: ids },
    });

    return {
      message: "Xóa blog thành công",
    };
  }
}

module.exports = BlogService;
