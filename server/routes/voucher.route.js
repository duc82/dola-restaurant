const { Router } = require("express");
const voucherController = require("../controllers/voucher.controller");
const authorization = require("../middlewares/authorization.middleware");
const authentication = require("../middlewares/authentication.middleware");
const VoucherDto = require("../dtos/voucher.dto");
const { Query } = require("../middlewares/validation.middleware");

const router = Router();
const voucherDto = new VoucherDto();

router.get("/", Query(voucherDto.getAll), voucherController.getAll);
router.get("/by-code/:code", voucherController.getByCode);
router.post("/create", authorization, voucherController.create);
router.put("/update/:id", authorization, voucherController.update);
router.delete("/delete/:id", authorization, voucherController.delete);
router.delete("/delete-many", authorization, voucherController.deleteMany);

module.exports = router;
