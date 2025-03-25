import { FullType, Pagination } from ".";

export enum VoucherType {
  SHIPPING = "shipping",
  DISCOUNT = "discount",
}

interface Voucher {
  code: string;
  discount: number;
  minAmount: number;
  expireAt: string;
  quantity: number;
  type: VoucherType;
}

interface FullVoucher extends FullType, Voucher {}

interface VoucherResponse {
  voucher: FullVoucher;
  message: string;
}

interface VouchersResponse extends Pagination {
  vouchers: FullVoucher[];
  message: string;
}

export type { Voucher, FullVoucher, VoucherResponse, VouchersResponse };
