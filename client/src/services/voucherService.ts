import {
  FullVoucher,
  Voucher,
  VoucherResponse,
  VouchersResponse,
} from "@/types/voucher";
import apiRequest from "./api";

const voucherService = {
  getAll: () => {
    return apiRequest<VouchersResponse>("/vouchers", "GET");
  },

  create: (data: Voucher) => {
    return apiRequest<VoucherResponse>("/vouchers/create", "POST", {
      refreshToken: true,
      data,
    });
  },

  getById: (id: string) => {
    return apiRequest<FullVoucher>(`/vouchers/${id}`, "GET");
  },

  update: (id: string, data: Voucher) => {
    return apiRequest<VoucherResponse>(`/vouchers/update/${id}`, "PUT", {
      refreshToken: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/vouchers/delete/${id}`, "DELETE", {
      refreshToken: true,
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/vouchers/delete-many", "DELETE", {
      refreshToken: true,
      data: { ids },
    });
  },
};

export default voucherService;
