import { Statistic } from "@/types/statistic";
import apiRequest from "./api";

const statisticService = {
  async getStatistics() {
    return apiRequest<Statistic>("/statistics");
  },
};

export default statisticService;
