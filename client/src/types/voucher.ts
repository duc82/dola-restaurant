import { FullType } from ".";

interface Voucher {
  code: string;
  discount: number;
  minAmount: number;
  expiredAt: string;
  quantity: number;
  type: "shipping" | "discount";
}

interface FullVoucher extends FullType, Voucher {}

interface VoucherResponse {
  voucher: FullVoucher;
  message: string;
}

interface VouchersResponse {
  vouchers: FullVoucher[];
  message: string;
}

export type { Voucher, FullVoucher, VoucherResponse, VouchersResponse };
