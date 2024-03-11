import { Link } from "react-router-dom";
import formatVnd from "@/utils/formatVnd";
import { CartFill, Eyes, Heart } from "@/icons";
import { useProductQuickview } from "@/context/ProductQuickviewContent";
import { useAppDispatch } from "@/store/hooks";
import { increaseQuantity } from "@/store/reducers/cartSlice";
import { useModalCart } from "@/context/AddedCartContext";
import { useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FullProduct } from "@/types/product";

const ProductCard = (product: FullProduct) => {
  const dispatch = useAppDispatch();
  const { onOpenClick } = useProductQuickview();
  const { updateAddedCart } = useModalCart();

  const { title, images, price, discountPercent, slug, discountedPrice } =
    product;

  const handleIncreaseQuantity = useCallback(() => {
    if (!product) return;
    dispatch(
      increaseQuantity({ ...product, price: discountedPrice, quantity: 1 })
    );
    updateAddedCart({ ...product, price: discountedPrice, quantity: 1 });
  }, [product, dispatch, updateAddedCart, discountedPrice]);

  return (
    <div className="shadow-card bg-gray-200 p-2 pb-10 relative mb-5">
      <div className="relative overflow-hidden group">
        <Link
          to={`/san-pham/${slug}`}
          title={title}
          className="absolute inset-1/4 opacity-0 bg-[rgba(136,136,136,0.5)] hidden transition-all ease-linear group-hover:opacity-100 group-hover:inset-0 lg:block"
        ></Link>
        <Link to={`/san-pham/${slug}`} className="block" title={title}>
          <LazyLoadImage src={images[0].url} alt={title} effect="opacity" />
        </Link>
        <div className="absolute inset-0 h-16 hidden lg:flex justify-center w-full m-auto z-20">
          <button
            type="button"
            title="Xem nhanh"
            onClick={() => onOpenClick(product)}
            className="text-yellow-primary hover:text-yellow-secondary rounded-full bg-white w-[52px] h-[52px] flex items-center justify-center border border-yellow-primary -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-linear mx-1"
          >
            <Eyes />
          </button>
          <button
            type="button"
            title="Thêm vào giỏ hàng"
            onClick={handleIncreaseQuantity}
            className="text-yellow-primary hover:text-yellow-secondary rounded-full bg-white w-[52px] h-[52px] flex items-center justify-center border border-yellow-primary translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-linear mx-1"
          >
            <CartFill />
          </button>
        </div>
        {discountPercent > 0 && (
          <div className="absolute top-1.5 right-1.5 bg-red-500 text-white py-1 px-4 rounded-lg text-base font-bold text-center leading-5 z-30">
            - {discountPercent}%
          </div>
        )}
        <button
          type="button"
          title="Thêm vào yêu thích"
          className="absolute bottom-0 flex justify-center items-center left-1/2 z-20 bg-yellow-primary w-[82px] h-[41px] rounded-t-full -translate-x-1/2 pt-1"
        >
          <Heart />
        </button>
      </div>
      <div className="m-2.5 mb-0 text-black">
        <h2 className="font-bold text-xs md:text-base text-center mb-2 hover:text-yellow-primary">
          <Link to={`/san-pham/${slug}`} className="line-clamp-1 leading-snug">
            {title}
          </Link>
        </h2>
        <div className="flex items-center justify-center space-x-2.5">
          <span className="text-red-600 text-xs md:text-lg font-semibold">
            {formatVnd(discountedPrice)}
          </span>
          {discountPercent > 0 && (
            <del className="text-gray-500 text-xs font-medium line-through">
              {formatVnd(price)}
            </del>
          )}
        </div>
        <Link
          to={`/san-pham/${slug}`}
          className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-full md:max-w-[110px] block bg-yellow-primary text-white px-4 rounded-lg shadow-card2 leading-9 text-center hover:bg-yellow-secondary"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
