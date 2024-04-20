const asyncHandler = require("../middlewares/asyncHandler.middleware");
const Blog = require("../models/blog.model");
const CustomError = require("../utils/error.util");

class BlogController {
  getAll() {
    return asyncHandler(async (req, res) => {
      const page = req.query.page ? +req.query.page : 1;
      const limit = req.query.limit ? +req.query.limit : 0;
      const skip = (page - 1) * limit;

      const blogs = await Blog.find()
        .populate("user")
        .skip(skip)
        .limit(limit === 0 ? null : limit);
      const total = await Blog.count();

      res.status(200).json({ blogs, limit, total, skip });
    });
  }

  getByTitle() {
    return asyncHandler(async (req, res) => {
      const { title } = req.params;
      const blog = await Blog.findOne({
        title,
      }).populate("user");

      if (!blog) {
        throw new CustomError({
          message: `Không tìm thấy blog nào với tiêu đề: ${title}`,
          status: 404,
        });
      }

      res.status(200).json(blog);
    });
  }

  create() {
    return asyncHandler(async (req, res) => {
      const { title, description, image, user } = req.body;

      const blog = await Blog.create({
        title,
        description,
        image,
        user,
      });

      res.status(201).json({ blog, message: "Thêm mới blog thành công" });
    });
  }

  update() {
    return asyncHandler(async () => {
      const { id } = req.params;

      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({ message: "Cập nhật blog thành công", blog });
    });
  }

  delete() {
    return asyncHandler(async () => {
      const { id } = req.params;

      const blog = await Blog.findByIdAndDelete(id);

      if (!blog) {
        throw new CustomError({
          message: "Xóa blog thất bại",
          status: 400,
        });
      }

      res.status(200).json({ message: "Xóa blog thành công", status: 200 });
    });
  }
}

const blogController = new BlogController();

module.exports = blogController;
