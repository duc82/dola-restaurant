import { useEffect, useRef } from "react";
import Title from "../Home/Title";
import ProductListSlider from "../Product/ProductListSlider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllProduct } from "@/store/reducers/productSlice";
import useInView from "@/hooks/useInView";

const ProductRelate = ({
  parentCategorySlug,
}: {
  parentCategorySlug?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (parentCategorySlug && isInView) {
      dispatch(getAllProduct({ category: parentCategorySlug }));
    }
  }, [dispatch, parentCategorySlug, isInView]);

  return (
    <div className="mb-10" ref={ref}>
      <Title>Món ăn cùng loại</Title>
      <ProductListSlider products={products} />
    </div>
  );
};

export default ProductRelate;
