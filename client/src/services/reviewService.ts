import { ReviewsResponse } from "@/types/review";
import apiRequest from "./api";

const reviewService = {
  getAll: async () => {
    return apiRequest<ReviewsResponse>("/reviews", {});
  },
};

export default reviewService;
