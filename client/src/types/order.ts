import { Timestamp } from ".";
import { FullAddress } from "./address";
import { FullProduct } from "./product";
import { FullUser } from "./user";

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
  isPaid: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  isCancelled?: boolean;
  cancelledAt?: string;
  note?: string;
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
}

interface OrderResponse {
  order: FullOrder;
  message: string;
}

interface OrdersResponse {
  orders: FullOrder[];
}

export type { Order, FullOrder, OrderResponse, OrdersResponse };
