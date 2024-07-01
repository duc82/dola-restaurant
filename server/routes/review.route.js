const { Router } = require("express");
const reviewController = require("../controllers/review.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

const router = Router();

router.post("/create", authorizationMiddleware, reviewController.create);

router.get(
  "/:productId",
  authenticationMiddleware,
  reviewController.getByProduct
);

module.exports = router;
