const { Router } = require("express");
const router = Router();
const addressController = require("../controllers/address.controller");
const authentication = require("../middlewares/authentication.middleware");

router.get("/by-user", authentication, addressController.getByUserId);

router.post("/create", authentication, addressController.create);

router.put("/update/:id", authentication, addressController.update);

router.delete("/delete/:id", authentication, addressController.delete);

module.exports = router;
