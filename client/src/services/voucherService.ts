import { QueryOptions } from "@/types";
import apiRequest from "./api";
import {
  FullVoucher,
  Voucher,
  VoucherResponse,
  VouchersResponse,
} from "@/types/voucher";

const voucherService = {
  getAll: async (queryOptions: QueryOptions) => {
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

    return apiRequest<VoucherResponse | FullVoucher>("/vouchers" + query);
  },

  getByCode: async (code: string, amount: number) => {
    return apiRequest<FullVoucher>(
      `/vouchers/by-code/${code}?amount=${amount}`
    );
  },

  create: async (data: Voucher) => {
    return apiRequest<VouchersResponse>("/vouchers/create", {
      accessToken: true,
      refreshToken: true,
      method: "POST",
      data,
    });
  },

  update: async (id: string, data: Partial<Voucher>) => {
    return apiRequest<VouchersResponse>(`/vouchers/update/${id}`, {
      accessToken: true,
      refreshToken: true,
      method: "PUT",
      data,
    });
  },

  delete: async (id: string) => {
    return apiRequest<VouchersResponse>(`/vouchers/delete/${id}`, {
      accessToken: true,
      refreshToken: true,
      method: "DELETE",
    });
  },
};

export default voucherService;
