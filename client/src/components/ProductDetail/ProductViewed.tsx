import { useEffect } from "react";
import Title from "../Home/Title";
import ProductListSlider from "../Product/ProductListSlider";
import { FullProduct } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addViewedProducts } from "@/store/reducers/productSlice";

const ProductViewed = ({ product }: { product: FullProduct }) => {
  const { viewedProducts } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isExists = viewedProducts.some((vp) => vp._id === product._id);

    if (!isExists) {
      dispatch(addViewedProducts(product));
    }
  }, [product, viewedProducts, dispatch]);

  return (
    <div className="mb-10">
      <Title>Món ăn đã xem</Title>
      <ProductListSlider products={viewedProducts} />
    </div>
  );
};

export default ProductViewed;
