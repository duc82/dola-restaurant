const { Router } = require("express");
const blogController = require("../controllers/blog.controller");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.get("/", blogController.getAll());
router.get("/by-title/:title", blogController.getByTitle());
router.post("/create", upload.single("image"), blogController.create());
router.patch("/update/:id", blogController.update());
router.delete("/delete/:id", blogController.delete());

module.exports = router;
