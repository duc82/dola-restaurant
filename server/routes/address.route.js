const { Router } = require("express");
const router = Router();
const addressController = require("../controllers/address.controller");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.get("/", authorization, addressController.getAll);

router.get("/current", authentication, addressController.getCurrent);

router.post("/create", authentication, addressController.create);

router.put("/update/:id", authentication, addressController.update);

router.delete("/delete/:id", authentication, addressController.delete);

module.exports = router;
