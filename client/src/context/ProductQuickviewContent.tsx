import { createContext, useContext, useState } from "react";
import { ChildrenProps } from "../types";
import { FullProduct } from "@/types/product";

interface ProductQuickviewType {
  isActive: boolean;
  onCloseClick: () => void;
  product: FullProduct | null;
  onOpenClick: (product: FullProduct) => void;
}

const ProductQuickviewContext = createContext<ProductQuickviewType>({
  isActive: false,
  onCloseClick: () => {},
  product: null,
  onOpenClick: () => {},
});

export const ProductQuickviewProvider = ({ children }: ChildrenProps) => {
  const [isActive, setIsActive] = useState(false);
  const [product, setProduct] = useState<FullProduct | null>(null);

  const onOpenClick = (product: FullProduct) => {
    setProduct(product);
    setIsActive(true);
  };

  const onCloseClick = () => {
    setIsActive(false);
  };

  return (
    <ProductQuickviewContext.Provider
      value={{
        isActive,
        onCloseClick,
        onOpenClick,
        product,
      }}
    >
      {children}
    </ProductQuickviewContext.Provider>
  );
};

export const useProductQuickview = () => useContext(ProductQuickviewContext);
