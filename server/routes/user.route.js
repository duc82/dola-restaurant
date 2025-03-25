/**
 * @swagger
 * components:
 *  schemas:
 *    Token:
 *      type: object
 *      properties:
 *        passwordResetToken:
 *          type: string
 *          description: Token đặt lại mật khẩu
 *        passwordResetTokenExpirationAt:
 *          type: string
 *          format: date-time
 *          description: Thời gian hết hạn token đặt lại mật khẩu
 *    User:
 *      type: object
 *      required:
 *        - fullName
 *        - email
 *        - password
 *      properties:
 *        _id:
 *          type: string
 *          format: ObjectId
 *          description: Id người dùng
 *        fullName:
 *          type: string
 *          description: Họ tên người dùng
 *        email:
 *          type: string
 *          format: email
 *          description: Email người dùng
 *        phone:
 *          type: string
 *          description: Số điện thoại người dùng
 *        password:
 *          type: string
 *          description: Mật khẩu người dùng
 *        role:
 *          type: string
 *          enum: ["user", "admin"]
 *          description: Vai trò người dùng
 *        token:
 *          type: object
 *          description: Token người dùng
 *          $ref: "#/components/schemas/Token"
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Thời gian tạo người dùng
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: Thời gian cập nhật người dùng
 *
 */

const { Router } = require("express");
const userController = require("../controllers/user.controller");
const UserDto = require("../dtos/user.dto");
const authorization = require("../middlewares/authorization.middleware");
const authentication = require("../middlewares/authentication.middleware");
const { Body, Params, Query } = require("../middlewares/validation.middleware");
const { lowLimiter } = require("../middlewares/limiter.middleware");

const userDto = new UserDto();

const router = Router();

router.get("/current", authentication, userController.getCurrent);
router.get("/", Query(userDto.getAll), userController.getAll);

router.post(
  "/create",
  lowLimiter,
  authorization,
  Body(userDto.create),
  userController.create
);

router.put(
  "/update/current",
  lowLimiter,
  authentication,
  Body(userDto.updateCurrent),
  userController.updateCurrent
);

router.put(
  "/update/:id",
  lowLimiter,
  authorization,
  Params(userDto.getById),
  userController.update
);

router.post(
  "/changePassword",
  authentication,
  Body(userDto.changePassword),
  userController.changePassword
);

router.delete(
  "/delete/:id",
  lowLimiter,
  authorization,
  Params(userDto.getById),
  userController.delete
);

router.delete(
  "/delete-many",
  lowLimiter,
  authorization,
  Body(userDto.deleteMany),
  userController.deleteMany
);

module.exports = router;
