import ProductCard from "./ProductCard";
import { useAppSelector } from "@/store/hooks";
import { FullProduct } from "@/types/product";
import cn from "@/utils/cn";

interface ProductListsProps {
  products: FullProduct[];
  wrapperClassName?: string;
  page?: string;
}

const ProductList = ({
  products,
  wrapperClassName,
  page,
}: ProductListsProps) => {
  const { isLoading } = useAppSelector((state) => state.product);

  if (page === "Home" && isLoading) {
    return <div className="text-center">Đang tải dữ liệu...</div>;
  }

  if (!isLoading && products.length < 1)
    return <div className="text-center">Món ăn đang được cập nhật</div>;

  return (
    <section
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5 w-full mb-10",
        wrapperClassName
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={i} {...product} />
      ))}
    </section>
  );
};

export default ProductList;
