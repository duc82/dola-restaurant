const { Router } = require("express");
const blogController = require("../controllers/blog.controller");
const BlogDto = require("../dtos/blog.dto");
const { Query } = require("../middlewares/validation.middleware");

const router = Router();
const blogDto = new BlogDto();

router.get("/", Query(blogDto.getAll), blogController.getAll);
router.get("/by-titleslug/:slug", blogController.getBySlug);
router.post("/create", blogController.create);
router.put("/update/:id", blogController.update);
router.delete("/delete/:id", blogController.delete);
router.delete("/delete-many", blogController.deleteMany);

module.exports = router;
