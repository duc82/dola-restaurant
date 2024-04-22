const { Router } = require("express");

const voucherController = require("../controllers/voucher.controller");
const { Body, Params } = require("../middlewares/validation.middleware");
const VoucherDto = require("../dtos/voucher.dto");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const voucherDto = new VoucherDto();

const router = Router();

router.post(
  "/create",
  authorizationMiddleware,
  Body(voucherDto.create),
  voucherController.create
);

router.get("/", voucherController.getAll);

router.get("/:id", Params(voucherDto.getById), voucherController.getById);

router.put(
  "/update/:id",
  Params(voucherDto.getById),
  Body(voucherDto.update),
  voucherController.update
);

router.delete(
  "/delete/:id",
  Params(voucherDto.getById),
  voucherController.delete
);

router.delete(
  "/delete-many",
  Body(voucherDto.deleteMany),
  voucherController.deleteMany
);

module.exports = router;
