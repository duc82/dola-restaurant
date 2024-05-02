import { FullVoucher, Voucher, VoucherResponse } from "@/types/voucher";
import apiRequest from "./api";

const voucherService = {
  getAll: () => {
    return apiRequest<FullVoucher[]>("/vouchers");
  },

  create: (data: Voucher) => {
    return apiRequest<VoucherResponse>("/vouchers/create", {
      method: "POST",
      refreshToken: true,
      data,
    });
  },

  getById: (id: string) => {
    return apiRequest<FullVoucher>(`/vouchers/${id}`);
  },

  update: (id: string, data: Voucher) => {
    return apiRequest<VoucherResponse>(`/vouchers/update/${id}`, {
      method: "PUT",
      refreshToken: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/vouchers/delete/${id}`, {
      method: "DELETE",
      refreshToken: true,
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/vouchers/delete-many", {
      method: "DELETE",
      refreshToken: true,
      data: { ids },
    });
  },
};

export default voucherService;
