/**
 * @swagger
 * components:
 *  schemas:
 *   Image:
 *    type: object
 *    required:
 *     - url
 *    properties:
 *      _id:
 *        type: string
 *        format: ObjectId
 *        description: Id ảnh
 *      url:
 *       type: string
 *       description: Đường dẫn ảnh
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - title
 *        - price
 *        - stock
 *        - category
 *        - images
 *        - taste
 *        - size
 *        - description
 *      properties:
 *        _id:
 *          type: string
 *          format: ObjectId
 *          description: Id của sản phẩm
 *        title:
 *          type: string
 *          description: Tiêu đề của sản phẩm
 *        slug:
 *          type: string
 *          description: Slug của sản phẩm
 *        images:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Image'
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Thời gian tạo sản phẩm
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: Thời gian cập nhật sản phẩm
 *
 */

const { Router } = require("express");
const productController = require("../controllers/product.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const ProductDto = require("../dtos/product.dto");
const { Query } = require("../middlewares/validation.middleware");

const router = Router();

const productDto = new ProductDto();

router.get("/", Query(productDto.getAll), productController.getAll);

router.get(
  "/parent-category/:slug",
  Query(productDto.getParentCategory),
  productController.getParentCategory
);

router.get("/by-slug/:slug", productController.getBySlug);

router.post("/create", authorizationMiddleware, productController.create);

router.put("/update/:id", authorizationMiddleware, productController.update);

router.delete("/delete/:id", productController.delete);

router.post(
  "/deleteMany",
  authorizationMiddleware,
  productController.deleteMany
);

module.exports = router;
