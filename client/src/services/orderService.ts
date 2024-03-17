import apiRequest from "./api";
import type { Order, OrderResponse, OrdersResponse } from "../types/order";

const orderService = {
  create(data: Order): Promise<OrderResponse> {
    return apiRequest<OrderResponse>("/orders/create", "POST", {
      refreshToken: true,
      data,
    });
  },

  getAll(): Promise<OrdersResponse> {
    return apiRequest<OrdersResponse>("/orders", "GET", {
      refreshToken: true,
    });
  },

  getById(id: string): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/${id}`, "GET", {
      refreshToken: true,
    });
  },
};

export default orderService;
