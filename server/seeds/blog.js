const BlogService = require("../services/blog.service");
const blogs = require("./jsons/blogs.json");

const blogService = new BlogService();

module.exports = async () => {
  for (const blog of blogs) {
    const data = await blogService.create(blog);
    console.log(data);
  }
};
