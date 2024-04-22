const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const { Body } = require("../middlewares/validation.middleware");
const OrderDto = require("../dtos/order.dto");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

const orderDto = new OrderDto();

const router = Router();

router.post(
  "/create",
  Body(orderDto.create),
  authenticationMiddleware,
  orderController.create
);
router.get("/", authenticationMiddleware, orderController.getAll);
router.get("/:id", authenticationMiddleware, orderController.getById);

module.exports = router;
