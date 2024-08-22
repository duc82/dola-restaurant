/**
 * @swagger
 * components:
 *  schemas:
 *
 *
 *   Category:
 *    type: object
 *    required:
 *     - name
 *     - slug
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
 *     childrens:
 *      type: array
 *      description: Danh sách danh mục con
 *     parent:
 *      type: string
 *      nullable: true
 *      description: Id danh mục cha
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
 *
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
 *        minimum: 1
 *    - in: query
 *      name: limit
 *      description: Số lượng danh mục sản phẩm trên mỗi trang
 *      required: false
 *      schema:
 *        type: number
 *        minimum: 1
 *
 *   responses:
 *    200:
 *      description: Lấy danh sách danh mục sản phẩm thành công
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              categories:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Category'
 *              total:
 *                type: number
 *                example: 6
 *              page:
 *                type: number
 *                example: 1
 *              limit:
 *                type: number
 *                example: 10
 *              skip:
 *                type: number
 *                example: 0
 *    500:
 *      description: Lấy danh sách danh mục sản phẩm thất bại
 *
 */

const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const authorization = require("../middlewares/authorization.middleware");
const { Query } = require("../middlewares/validation.middleware");
const CategoryDto = require("../dtos/category.dto");

const router = Router();

const categoryDto = new CategoryDto();

router.get("/", Query(categoryDto.getAll), categoryController.getAll);

router.get("/childrens", categoryController.getChildrens);

router.post("/create", authorization, categoryController.create);

router.put("/update/:id", authorization, categoryController.update);

router.delete("/delete/:id", authorization, categoryController.delete);

router.delete("/delete-many", authorization, categoryController.deleteMany);

module.exports = router;
