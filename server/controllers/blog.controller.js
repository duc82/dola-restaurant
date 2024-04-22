const asyncHandler = require("../middlewares/asyncHandler.middleware");
const Blog = require("../models/blog.model");
const CustomError = require("../utils/error.util");

class BlogController {
  constructor() {
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getByTitle = asyncHandler(this.getByTitle.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
  }

  async getAll() {
    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 0;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate("user")
      .skip(skip)
      .limit(limit === 0 ? null : limit);
    const total = await Blog.count();

    res.status(200).json({ blogs, limit, total, skip });
  }

  async getByTitle() {
    const { title } = req.params;
    const blog = await Blog.findOne({
      title
    }).populate("user");

    if (!blog) {
      throw new CustomError({
        message: `Không tìm thấy blog nào với tiêu đề: ${title}`,
        status: 404
      });
    }

    res.status(200).json(blog);
  }

  async create() {
    const { title, description, image, user } = req.body;

    const blog = await Blog.create({
      title,
      description,
      image,
      user
    });

    res.status(201).json({ blog, message: "Thêm mới blog thành công" });
  }

  async update() {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },
      { new: true }
    );

    res.status(200).json({ message: "Cập nhật blog thành công", blog });
  }

  async delete() {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      throw new CustomError({
        message: "Xóa blog thất bại",
        status: 400
      });
    }

    res.status(200).json({ message: "Xóa blog thành công", status: 200 });
  }
}

module.exports = new BlogController();
