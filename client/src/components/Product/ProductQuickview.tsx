import { Close } from "@/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import formatVnd from "@/utils/formatVnd";
import useQuantity from "@/hooks/useQuantity";
import { useAppDispatch } from "@/store/hooks";
import { increaseQuantity } from "@/store/reducers/cartSlice";
import cn from "@/utils/cn";
import { FullProduct } from "@/types/product";
import useProductQuickview from "@/hooks/useProductQuickview";
import Overlay from "../Overlay";
import { useModalCart } from "@/providers/CartProvider";

const ProductQuickview = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onCloseClick, product } = useProductQuickview();
  const { updateAddedCart } = useModalCart();
  const {
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleChangeQuantity,
    resetQuantity,
  } = useQuantity({ max: product?.stock });

  const handleAddCart = (product: FullProduct | null) => {
    if (!product) return;
    if (!quantity) {
      resetQuantity();
    }
    const newCart = { ...product, quantity: quantity ? +quantity : 1 };
    dispatch(increaseQuantity(newCart));
    onCloseClick();
    updateAddedCart(newCart);
  };

  return (
    <div
      id="product-quickview"
      className={cn("fixed inset-0 z-[9999] invisible", isOpen && "visible")}
    >
      <Overlay show={isOpen} onClick={onCloseClick} />
      <div
        className={cn(
          "absolute top-1/2 left-0 right-0 -translate-y-1/2 max-w-[700px] mx-auto p-[30px] border border-yellow-primary bg-emerald-primary text-white opacity-0 scale-90 will-change-transform transition-all duration-300 z-[2000]",
          isOpen && "opacity-100 scale-100"
        )}
      >
        <div className="flex space-x-8">
          <LazyLoadImage
            src={product?.images[0].url}
            alt={product?.title}
            effect="opacity"
            wrapperClassName="!block flex-1"
          />

          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-2">
              <Link to={`/san-pham/${product?.slug}`} title={product?.title}>
                {product?.title}
              </Link>
            </h1>
            <div className="mb-2.5">
              <span className="text-red-500 text-[28px] font-bold">
                {formatVnd(product?.discountedPrice)}
              </span>
              {product && product.discountPercent > 0 && (
                <del className="text-base text-white ml-2">
                  {formatVnd(product?.price)}
                </del>
              )}
            </div>
            <form>
              <label htmlFor="quantity" className="mb-2.5 block">
                Số lượng:
              </label>
              <div className="flex items-center space-x-1.5 mb-4">
                <button
                  type="button"
                  title="Giảm"
                  onClick={handleDecreaseQuantity}
                  className="w-10 h-10 text-xl rounded-md bg-yellow-primary"
                >
                  -
                </button>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  maxLength={3}
                  value={quantity}
                  onChange={handleChangeQuantity}
                  className="w-10 h-10 py-0 px-0.5 text-black text-center outline-none rounded-md text-[15px] border border-yellow-primary"
                />
                <button
                  type="button"
                  title="Thêm"
                  onClick={handleIncreaseQuantity}
                  className="w-10 h-10 text-xl rounded-md bg-yellow-primary"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddCart(product)}
                title="Thêm vào giỏ hàng"
                type="button"
                className="h-11 px-5 bg-yellow-primary uppercase rounded-md hover:bg-yellow-secondary"
              >
                Thêm vào giỏ hàng
              </button>
            </form>
          </div>
        </div>
        <button
          title="Đóng"
          className="absolute top-2.5 right-2.5"
          onClick={onCloseClick}
        >
          <Close />
        </button>
      </div>
    </div>
  );
};

export default ProductQuickview;
