/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *     - name
 *     - slug
 *
 *    properties:
 *     _id:
 *      type: string
 *      format: ObjectId
 *     name:
 *      type: string
 *      description: Tên danh mục
 *     slug:
 *      type: string
 *      description: Slug của danh mục
 *     description:
 *      type: string
 *      description: Mô tả danh mục sản phẩm
 *     image:
 *      type: string
 *      description: Đường dẫn ảnh của danh mục
 *     parentCategory:
 *      type: object
 *      description: Danh mục
 *     createdAt:
 *      type: string
 *      format: date-time
 *      description: Thời gian tạo
 *     updatedAt:
 *      type: string
 *      format: date-time
 *      description: Thời gian cập nhật
 *
 * tags:
 *  name: Category
 *  description: Danh mục sản phẩm API
 * /categories:
 *  get:
 *   summary: Lấy danh sách danh mục sản phẩm
 *   tags: [Category]
 *
 *   responses:
 *    200:
 *      description: Lấy danh sách danh mục sản phẩm thành công
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Category'
 *    500:
 *      description: Lỗi server
 *
 */

const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.get("/", categoryController.getAll);

router.post("/create", authorizationMiddleware, categoryController.create);

router.put(
  "/update/:id",
  authorizationMiddleware,
  upload.single("image"),
  categoryController.update
);

router.delete(
  "/delete/:id",
  authorizationMiddleware,
  categoryController.delete
);

router.delete(
  "/delete-many",
  authorizationMiddleware,
  categoryController.deletMany
);

module.exports = router;
