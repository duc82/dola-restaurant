import { QueryOptions } from "@/types";
import apiRequest from "./api";
import {
  FullVoucher,
  Voucher,
  VoucherResponse,
  VouchersResponse,
} from "@/types/voucher";
import queryString from "query-string";

const voucherService = {
  getAll: async (options?: QueryOptions) => {
    const query = queryString.stringify(options || {}, {
      skipEmptyString: true,
    });
    return apiRequest<FullVoucher[] | VouchersResponse>(`/vouchers?${query}`);
  },

  getByCode: async (code: string, amount: number) => {
    return apiRequest<FullVoucher>(
      `/vouchers/by-code/${code}?amount=${amount}`
    );
  },

  create: async (data: Voucher) => {
    return apiRequest<VoucherResponse>("/vouchers/create", {
      token: true,
      method: "POST",
      data,
    });
  },

  update: async (id: string, data: Partial<Voucher>) => {
    return apiRequest<VoucherResponse>(`/vouchers/update/${id}`, {
      token: true,
      method: "PUT",
      data,
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/vouchers/delete/${id}`, {
      token: true,
      method: "DELETE",
    });
  },

  deleteMany: async (ids: string[]) => {
    return apiRequest<{ message: string }>(`/vouchers/delete-many`, {
      token: true,
      method: "DELETE",
      data: { ids },
    });
  },
};

export default voucherService;
