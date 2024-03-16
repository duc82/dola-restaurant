const { Router } = require("express");
const userController = require("../controllers/user.controller");
const validation = require("../middlewares/validation.middleware");
const UserDto = require("../dtos/user.dto");
const authorization = require("../middlewares/authorization.middleware");
const authentication = require("../middlewares/authentication.middleware");

const userDto = new UserDto();

const router = Router();

router.get("/current", authentication, userController.getCurrent);
router.get("/", userController.getAll);

router.post(
  "/create",
  authorization,
  validation.validateDto(userDto.create),
  userController.create
);

router.put(
  "/update/current",
  authentication,
  validation.validateDto(userDto.updateCurrent),
  userController.updateCurrent
);

router.put(
  "/update/:id",
  authorization,
  validation.validateParams(userDto.getById),
  userController.update
);

router.post(
  "/changePassword",
  authentication,
  validation.validateDto(userDto.changePassword),
  userController.changePassword
);

router.delete(
  "/delete/:id",
  authorization,
  validation.validateParams(userDto.getById),
  userController.delete
);

router.delete(
  "/delete-many",
  authorization,
  validation.validateDto(userDto.deleteMany),
  userController.deleteMany
);

module.exports = router;
