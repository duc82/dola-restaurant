/**
 * @swagger
 * components:
 *  schemas:
 *   Image:
 *    type: object
 *    required:
 *     - url
 *    properties:
 *      url:
 *       type: string
 *       description: Đường dẫn ảnh
 *       example: https://res.cloudinary.com/dofqucuyy/image/upload/v1620228239/ecommerce/1620228238560-1.jpg
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
 *        - childCategory
 *        - parentCategory
 *        - images
 *        - taste
 *        - size
 *        - description
 *      properties:
 *        _id:
 *          type: string
 *          format: ObjectId
 *          description: Id của sản phẩm
 *          example: jgsger3423434
 *        title:
 *          type: string
 *          description: Tiêu đề của sản phẩm
 *          example: Rau
 *        slug:
 *          type: string
 *          description: Slug của sản phẩm
 *          example: rau
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *                example: https://res.cloudinary.com/dofqucuyy/image/upload/v1620228239/ecommerce/1620228238560-1.jpg
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
const upload = require("../middlewares/upload.middleware");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const router = Router();

router.get("/", productController.getAll);

router.get("/by-slug/:slug", productController.getBySlug);

router.post(
  "/create",
  authorizationMiddleware,
  upload.array("image[]", 12),
  productController.create
);

router.put(
  "/update/:id",
  authorizationMiddleware,
  upload.array("image[]", 12),
  productController.update
);

router.delete("/delete/:id", productController.delete);

router.post(
  "/deleteMany",
  authorizationMiddleware,
  productController.deleteMany
);

module.exports = router;
