import { FullType } from ".";

interface Voucher {
  code: string;
  discount: number;
  minimumCost: number;
  isActive: boolean;
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
