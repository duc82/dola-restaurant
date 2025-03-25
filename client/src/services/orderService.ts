import apiRequest from "./api";
import type {
  CreatePaymentUrlResponse,
  Order,
  OrderResponse,
  OrdersResponse,
  VnpayReturnResponse,
} from "../types/order";
import { QueryOptions } from "@/types";
import queryString from "query-string";

const orderService = {
  create(data: Order): Promise<OrderResponse> {
    return apiRequest<OrderResponse>("/orders/create", {
      method: "POST",
      token: true,
      data,
    });
  },

  getAll(
    options?: QueryOptions & { userId?: string }
  ): Promise<OrdersResponse> {
    const query = queryString.stringify(options || {}, {
      skipEmptyString: true,
    });

    return apiRequest<OrdersResponse>(`/orders?${query}`, {
      token: true,
    });
  },

  getById(id: string): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/${id}`, {
      token: true,
    });
  },

  createPaymentUrl(data: {
    amount: number;
    orderDescription: string;
    orderId: string;
  }): Promise<CreatePaymentUrlResponse> {
    return apiRequest<CreatePaymentUrlResponse>("/orders/create_payment_url", {
      method: "POST",
      token: true,
      data,
    });
  },

  vnpayReturn(query: string): Promise<VnpayReturnResponse> {
    return apiRequest<VnpayReturnResponse>(`/orders/vnpay_return?${query}`, {
      token: true,
    });
  },

  update(id: string, data: Partial<Order>): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/update/${id}`, {
      method: "PUT",
      token: true,
      data,
    });
  },

  delete(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/orders/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },

  deleteMany(ids: string[]): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/orders/delete-many`, {
      method: "DELETE",
      token: true,
      data: { ids },
    });
  },
};

export default orderService;
