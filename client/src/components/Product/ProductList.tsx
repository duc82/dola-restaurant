import ProductCard from "./ProductCard";
import { FullProduct } from "@/types/product";
import cn from "@/utils/cn";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
import { SkeletonTheme } from "react-loading-skeleton";

interface ProductListsProps {
  products: FullProduct[];
  wrapperClassName?: string;
  isLoading: boolean;
  skeletonCount?: number;
}

const ProductList = ({
  products,
  wrapperClassName,
  isLoading,
  skeletonCount = 4,
}: ProductListsProps) => {
  if (!isLoading && products.length < 1)
    return (
      <div className="py-3 px-5 rounded-md mb-5 text-warning bg-[rgb(255,243,205)]">
        Món ăn đang được cập nhật.
      </div>
    );

  return (
    <section
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5 w-full mb-10",
        wrapperClassName
      )}
    >
      {isLoading && (
        <SkeletonTheme baseColor="rgb(200,200,200)">
          {Array.from({ length: skeletonCount }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </SkeletonTheme>
      )}
      {!isLoading &&
        products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
    </section>
  );
};

export default ProductList;
