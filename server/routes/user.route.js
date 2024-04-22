const { Router } = require("express");
const userController = require("../controllers/user.controller");
const UserDto = require("../dtos/user.dto");
const authorization = require("../middlewares/authorization.middleware");
const authentication = require("../middlewares/authentication.middleware");
const { Body, Params, Query } = require("../middlewares/validation.middleware");

const userDto = new UserDto();

const router = Router();

router.get("/current", authentication, userController.getCurrent);
router.get("/", Query(userDto.getAll), userController.getAll);

router.post(
  "/create",
  authorization,
  Body(userDto.create),
  userController.create
);

router.put(
  "/update/current",
  authentication,
  Body(userDto.updateCurrent),
  userController.updateCurrent
);

router.put(
  "/update/:id",
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
  authorization,
  Params(userDto.getById),
  userController.delete
);

router.delete(
  "/delete-many",
  authorization,
  Body(userDto.deleteMany),
  userController.deleteMany
);

module.exports = router;
