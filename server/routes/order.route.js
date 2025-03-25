const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const { Body, Params } = require("../middlewares/validation.middleware");
const OrderDto = require("../dtos/order.dto");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");

const orderDto = new OrderDto();

const router = Router();

router.get("/vnpay_return", authentication, orderController.vnpayReturn);

router.post(
  "/create",
  Body(orderDto.create),
  authentication,
  orderController.create
);
router.get("/", authentication, orderController.getAll);
router.get("/:id", authentication, orderController.getById);

router.post(
  "/create_payment_url",
  authentication,
  orderController.createPaymentUrl
);

router.put(
  "/update/:id",
  Params(orderDto.getById),
  Body(orderDto.update),
  authentication,
  orderController.update
);

router.delete("/delete/:id", authorization, orderController.delete);
router.delete("/delete-many", authorization, orderController.deleteMany);

module.exports = router;
