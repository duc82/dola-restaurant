const asyncHandler = require("../middlewares/asyncHandler.middleware");
const StatisticService = require("../services/statistic.service");

class StatisticController {
  constructor() {
    this.statisticService = new StatisticService();
    this.getStatistic = asyncHandler(this.getStatistic.bind(this));
  }

  async getStatistic(req, res) {
    res.json(await this.statisticService.getStatistic());
  }
}

module.exports = new StatisticController();
