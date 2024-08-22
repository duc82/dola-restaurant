const { Router } = require("express");
const ContactController = require("../controllers/contact.controller");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");

const router = Router();

const contactController = new ContactController();

router.get("/", authentication, contactController.getAll);
router.post("/create", contactController.create);
router.put("/update/:id", authorization, contactController.update);
router.delete("/delete/:id", authorization, contactController.delete);
router.delete("/delete-many", authorization, contactController.deleteMany);

module.exports = router;
