const { Router } = require("express");
const reviewController = require("../controllers/review.controller");
const authentication = require("../middlewares/authentication.middleware");
const { Query } = require("../middlewares/validation.middleware");
const ReviewDto = require("../dtos/review.dto");

const reviewDto = new ReviewDto();

const router = Router();

router.get("/", Query(reviewDto.getAll), reviewController.getAll);

router.post("/create", authentication, reviewController.create);

router.get("/:productId", authentication, reviewController.getByProduct);

module.exports = router;
