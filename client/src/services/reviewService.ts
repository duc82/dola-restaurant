import { ReviewRequest, ReviewsResponse, ReviewResponse } from "@/types/review";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

interface QueryGetAllOptions extends QueryOptions {
  product?: string;
}

const reviewService = {
  getAll: async (queryOptions?: QueryGetAllOptions) => {
    let query = "";

    if (queryOptions?.page) {
      query += query
        ? `&page=${queryOptions.page}`
        : `?page=${queryOptions.page}`;
    }

    if (queryOptions?.limit) {
      query += query
        ? `&limit=${queryOptions.limit}`
        : `?limit=${queryOptions.limit}`;
    }

    if (queryOptions?.search) {
      query += query
        ? `&search=${queryOptions.search}`
        : `?search=${queryOptions.search}`;
    }

    if (queryOptions?.product) {
      query += query
        ? `&product=${queryOptions.product}`
        : `?product=${queryOptions.product}`;
    }

    return apiRequest<ReviewsResponse>(`/reviews${query}`, {
      token: true,
    });
  },

  create: async (data: ReviewRequest) => {
    return apiRequest<ReviewResponse>("/reviews/create", {
      method: "POST",
      data,
      token: true,
    });
  },
};

export default reviewService;
