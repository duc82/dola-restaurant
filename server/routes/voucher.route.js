const { Router } = require("express");

const voucherController = require("../controllers/voucher.controller");
const validation = require("../middlewares/validation.middleware");
const VoucherDto = require("../dtos/voucher.dto");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const voucherDto = new VoucherDto();

const router = Router();

router.post(
  "/create",
  authorizationMiddleware,
  validation.validateDto(voucherDto.create),
  voucherController.create
);

router.get("/", voucherController.getAll);

router.get(
  "/:id",
  validation.validateParams(voucherDto.getById),
  voucherController.getById
);

router.put(
  "/update/:id",
  validation.validateParams(voucherDto.getById),
  validation.validateDto(voucherDto.update),
  voucherController.update
);

router.delete(
  "/delete/:id",
  validation.validateParams(voucherDto.getById),
  voucherController.delete
);

router.delete(
  "/delete-many",
  validation.validateDto(voucherDto.deleteMany),
  voucherController.deleteMany
);

module.exports = router;
