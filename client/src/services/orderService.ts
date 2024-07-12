import apiRequest from "./api";
import type {
  CreatePaymentUrlResponse,
  Order,
  OrderResponse,
  OrdersResponse,
  VnpayReturnResponse,
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
      accessToken: true,
      refreshToken: true,
    });
  },

  getById(id: string): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/${id}`, {
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

  vnpayReturn(query: string): Promise<VnpayReturnResponse> {
    return apiRequest<VnpayReturnResponse>(`/orders/vnpay_return?${query}`, {
      accessToken: true,
      refreshToken: true,
    });
  },

  update(id: string, data: Partial<Order>): Promise<OrderResponse> {
    return apiRequest<OrderResponse>(`/orders/update/${id}`, {
      method: "PUT",
      accessToken: true,
      refreshToken: true,
      data,
    });
  },

  delete(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/orders/delete/${id}`, {
      method: "DELETE",
      accessToken: true,
      refreshToken: true,
    });
  },

  deleteMany(ids: string[]): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/orders/delete-many`, {
      method: "DELETE",
      accessToken: true,
      refreshToken: true,
      data: { ids },
    });
  },
};

export default orderService;
