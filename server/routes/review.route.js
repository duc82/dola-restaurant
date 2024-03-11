const { Router } = require("express");
const reviewController = require("../controllers/review.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const router = Router();

router.post("/create", authorizationMiddleware, reviewController.createReview);

module.exports = router;
