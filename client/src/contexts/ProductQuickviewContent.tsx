import { FullProduct } from "@/types/product";
import { createContext } from "react";

interface ProductQuickviewType {
  isOpen: boolean;
  onCloseClick: () => void;
  product: FullProduct | null;
  onOpenClick: (product: FullProduct) => void;
}

const ProductQuickviewContext = createContext<ProductQuickviewType>({
  isOpen: false,
  onCloseClick: () => {},
  product: null,
  onOpenClick: () => {},
});

export default ProductQuickviewContext;
