import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="mb-5">
      <div className="shadow-card bg-gray-200 p-2 pb-[30px] relative">
        <div className="relative">
          <Skeleton height={"220px"} />
        </div>
        <div className="m-2.5 mb-0">
          <div className="mb-2">
            <Skeleton height={20} />
          </div>
          <div className="flex items-center justify-center space-x-2.5">
            <Skeleton containerClassName="flex-1" height={16} />
            <Skeleton containerClassName="flex-1" height={16} />
          </div>
          <button
            type="button"
            className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-full md:max-w-[110px] block bg-yellow-primary text-white px-4 rounded-lg shadow-card2 leading-9 text-center hover:bg-yellow-secondary"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
