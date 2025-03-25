import { useEffect, useRef, useState } from "react";
import Title from "../Home/Title";
import ProductListSlider from "../Product/ProductListSlider";
import useInView from "@/hooks/useInView";
import { FullProduct } from "@/types/product";
import productService from "@/services/productService";

const ProductRelate = ({ categorySlug }: { categorySlug?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    triggerOnce: true,
  });
  const [products, setProducts] = useState<FullProduct[]>([]);

  useEffect(() => {
    if (categorySlug && isInView) {
      productService
        .getAll({ categorySlug })
        .then((res) => setProducts(res.products));
    }
  }, [categorySlug, isInView]);

  return (
    <div className="mb-10" ref={ref}>
      <Title>Món ăn cùng loại</Title>
      <ProductListSlider products={products} />
    </div>
  );
};

export default ProductRelate;
