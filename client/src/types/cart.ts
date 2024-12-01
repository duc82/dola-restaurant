import { FullProduct } from "./product";

interface Cart extends FullProduct {
  quantity: number;
}

export type { Cart };
