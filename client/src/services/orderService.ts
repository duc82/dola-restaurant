import apiRequest from "./api";
import type { Order, OrderResponse, OrdersResponse } from "../types/order";

const orderService = {
  create(data: Order): Promise<OrderResponse> {
    return apiRequest<OrderResponse>("/orders/create", {
      method: "POST",
      refreshToken: true,
      data
    });
  },

  getAll(): Promise<OrdersResponse> {
    return apiRequest<OrdersResponse>("/orders", {
      method: "GET",
      refreshToken: true
    });
  },

  getById(id: string): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/${id}`, {
      method: "GET",
      refreshToken: true
    });
  }
};

export default orderService;
