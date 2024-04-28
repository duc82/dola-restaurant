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
 *      description: Id danh mục
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
 *      description: Danh mục cha
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
 *  description: Danh mục sản phẩm
 * /categories:
 *  get:
 *   summary: Lấy danh sách danh mục sản phẩm
 *   tags: [Category]
 *
 *   parameters:
 *    - in: query
 *      name: page
 *      description: Số trang
 *      required: false
 *      schema:
 *        type: number
 *        default: 1
 *    - in: query
 *      name: limit
 *      description: Số lượng danh mục sản phẩm trên mỗi trang
 *      required: false
 *      schema:
 *        type: number
 *        default: 10
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
 *      description: Lấy danh sách danh mục sản phẩm thất bại
 *
 */

const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const { Query } = require("../middlewares/validation.middleware");
const CategoryDto = require("../dtos/category.dto");

const router = Router();

const categoryDto = new CategoryDto();

router.get("/", Query(categoryDto.getAll), categoryController.getAll);

router.get("/childs", categoryController.getAllChilds);

router.get("/parents", categoryController.getAllParents);

router.post("/create", authorizationMiddleware, categoryController.create);

router.put("/update/:id", authorizationMiddleware, categoryController.update);

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
