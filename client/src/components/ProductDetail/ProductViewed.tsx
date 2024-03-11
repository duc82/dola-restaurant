import { useEffect } from "react";
import Title from "../Home/Title";
import ProductListSlider from "../Product/ProductListSlider";
import { FullProduct } from "@/types/product";

const ProductViewed = ({ product }: { product: FullProduct | null }) => {
  const lastViewedProductsJsonString =
    localStorage.getItem("lastViewedProducts");

  const lastViewedProducts: FullProduct[] = JSON.parse(
    lastViewedProductsJsonString ?? "[]"
  );

  useEffect(() => {
    if (product) {
      if (!lastViewedProductsJsonString) {
        localStorage.setItem("lastViewedProducts", JSON.stringify([product]));
        return;
      }

      const listProductsViewed: FullProduct[] = JSON.parse(
        lastViewedProductsJsonString
      );

      const isProductViewed = listProductsViewed.some(
        (p) => p._id === product._id
      );

      if (!isProductViewed) {
        listProductsViewed.unshift(product);
        localStorage.setItem(
          "lastViewedProducts",
          JSON.stringify(listProductsViewed)
        );
      }
    }
  }, [product, lastViewedProductsJsonString]);

  return (
    <div className="mb-10">
      <Title>Món ăn đã xem</Title>
      <ProductListSlider products={lastViewedProducts} />
    </div>
  );
};

export default ProductViewed;
