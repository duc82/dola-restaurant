const { Router } = require("express");
const voucherController = require("../controllers/voucher.controller");
const authorization = require("../middlewares/authorization.middleware");
const authentication = require("../middlewares/authentication.middleware");

const router = Router();

router.get("/", authentication, voucherController.getAll);
router.get("/by-code/:code", voucherController.getByCode);
router.post("/create", authorization, voucherController.create);
router.put("/update/:id", authorization, voucherController.update);
router.delete("/delete/:id", authorization, voucherController.delete);

module.exports = router;
