const { Router } = require("express");
const blogController = require("../controllers/blog.controller");
const BlogDto = require("../dtos/blog.dto");
const { Query } = require("../middlewares/validation.middleware");
const authorization = require("../middlewares/authorization.middleware");

const router = Router();
const blogDto = new BlogDto();

router.get("/", Query(blogDto.getAll), blogController.getAll);
router.get("/by-titleslug/:slug", blogController.getBySlug);
router.post("/create", authorization, blogController.create);
router.put("/update/:id", authorization, blogController.update);
router.delete("/delete/:id", authorization, blogController.delete);
router.delete("/delete-many", authorization, blogController.deleteMany);

module.exports = router;
