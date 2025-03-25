const { Router } = require("express");
const statisticController = require("../controllers/statistic.controller");

const router = Router();

router.get("/", statisticController.getStatistic);

module.exports = router;
