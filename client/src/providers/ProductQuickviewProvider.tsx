import ProductQuickviewContext from "@/contexts/ProductQuickviewContent";
import { FullProduct } from "@/types/product";
import { useState } from "react";

const ProductQuickviewProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<FullProduct | null>(null);

  const onOpenClick = (product: FullProduct) => {
    setProduct(product);
    setIsOpen(true);
  };

  const onCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <ProductQuickviewContext.Provider
      value={{
        isOpen,
        onCloseClick,
        onOpenClick,
        product
      }}
    >
      {children}
    </ProductQuickviewContext.Provider>
  );
};

export default ProductQuickviewProvider;
