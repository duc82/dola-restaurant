import { Pagination, Timestamp } from ".";
import { FullAddress } from "./address";
import { FullProduct } from "./product";
import { FullUser } from "./user";
import { FullVoucher } from "./voucher";

interface Order {
  user: string;
  products: {
    product: string;
    quantity: number;
  }[];
  shippingAddress: string;
  paymentMethod: string;
  shippingFee: number;
  total: number;
  paidAt?: string | null;
  deliveredAt?: string | null;
  note?: string | null;
}

interface FullOrder
  extends Omit<Order, "user" | "products" | "shippingAddress">,
    Timestamp {
  _id: string;
  user: FullUser;
  products: {
    product: FullProduct;
    quantity: number;
  }[];
  shippingAddress: FullAddress;
  vouchers: FullVoucher[];
}

interface OrderResponse {
  order: FullOrder;
  message: string;
}

interface OrdersResponse extends Pagination {
  orders: FullOrder[];
}

interface CreatePaymentUrlResponse {
  code: string;
  url: string;
}

interface VnpayReturnResponse {
  code: string;
  message: string;
}

export type {
  Order,
  FullOrder,
  OrderResponse,
  OrdersResponse,
  CreatePaymentUrlResponse,
  VnpayReturnResponse,
};
