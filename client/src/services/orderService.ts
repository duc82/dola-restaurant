import apiRequest from "./api";
import type {
  CreatePaymentUrlResponse,
  Order,
  OrderResponse,
  OrdersResponse,
} from "../types/order";
import { QueryOptions } from "@/types";

const orderService = {
  create(data: Order): Promise<OrderResponse> {
    return apiRequest<OrderResponse>("/orders/create", {
      method: "POST",
      refreshToken: true,
      data,
    });
  },

  getAll(queryOptions?: QueryOptions): Promise<OrdersResponse> {
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

    return apiRequest<OrdersResponse>(`/orders${query}`, {
      method: "GET",
      accessToken: true,
      refreshToken: true,
    });
  },

  getById(id: string): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/${id}`, {
      method: "GET",
      refreshToken: true,
    });
  },

  createPaymentUrl(data: {
    amount: number;
    orderDescription: string;
    orderId: string;
  }): Promise<CreatePaymentUrlResponse> {
    return apiRequest<CreatePaymentUrlResponse>("/orders/create_payment_url", {
      method: "POST",
      accessToken: true,
      refreshToken: true,
      data,
    });
  },

  vnpayReturn(query: string): Promise<{ code: string; message: string }> {
    return apiRequest<{ code: string; message: string }>(
      `/orders/vnpay_return?${query}`,
      {
        method: "GET",
        accessToken: true,
        refreshToken: true,
      }
    );
  },
};

export default orderService;
