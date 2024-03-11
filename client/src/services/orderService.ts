import apiRequest from "./api";
import type { Order, OrderResponse, OrdersResponse } from "../types/order";

const orderService = {
  create(order: Order): Promise<OrderResponse> {
    return apiRequest<OrderResponse>("/orders/create", "POST", order, {
      refreshToken: true,
    });
  },

  getAll(): Promise<OrdersResponse> {
    return apiRequest<OrdersResponse>("/orders", "GET", null, {
      refreshToken: true,
    });
  },

  getById(id: string): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/${id}`, "GET", null, {
      refreshToken: true,
    });
  },
};

export default orderService;
