import { LazyLoadImage } from "react-lazy-load-image-component";
import formatVnd from "@/utils/formatVnd";
import { Link } from "react-router-dom";
import { Cart2 } from "@/icons";
import QuantityCounterCart from "../Cart/QuantityCounterCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeCart } from "@/store/reducers/cartSlice";
import { Cart } from "@/types/cart";

export const HeaderCartItem = (cart: Cart) => {
  const dispatch = useAppDispatch();

  const { _id, images, title, slug, discountedPrice } = cart;

  return (
    <li className="flex items-center space-x-4 border-b border-b-gray-300 mb-4 pb-4">
      <LazyLoadImage
        src={images[0].url}
        alt={title}
        effect="opacity"
        wrapperClassName="flex-none"
        width={80}
        height={80}
      />
      <div className="flex-1">
        <Link
          to={`/san-pham/${slug}`}
          className="font-semibold text-[13px] hover:text-yellow-primary block mb-2"
        >
          {title}
        </Link>
        <div className="flex">
          <div className="flex-1">
            <QuantityCounterCart cart={cart} />
          </div>
          <div className="flex-1 text-right">
            <span className="text-yellow-primary font-semibold block">
              {formatVnd(discountedPrice)}
            </span>
            <button
              type="button"
              className="text-[13px]"
              onClick={() => dispatch(removeCart(_id))}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

const HeaderCart = () => {
  const { carts, subTotal } = useAppSelector((state) => state.cart);

  return (
    <div className="hidden lg:block absolute top-full right-0 bg-white text-gray-700 rounded-md  transition-all duration-300 w-[340px] invisible opacity-0 scale-90 group-hover:visible  group-hover:opacity-100 group-hover:scale-100 z-[999]">
      {carts.length > 0 ? (
        <>
          <ul className="max-h-96 overflow-y-auto p-4 scrollbar">
            {carts.map((cart) => (
              <HeaderCartItem key={cart._id} {...cart} />
            ))}
          </ul>
          <div className="p-4">
            <div className="flex justify-between items-center mb-5">
              <p className="text-black">Tổng tiền:</p>
              <span className="text-yellow-primary font-semibold">
                {formatVnd(subTotal)}
              </span>
            </div>
            <Link
              to="/thanh-toan"
              className="text-white bg-yellow-primary py-2 w-full rounded-md text-center block hover:bg-yellow-secondary"
            >
              Thanh toán
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-black p-4">
          <Cart2 className="w-5 h-5 mb-4 mx-auto" />
          <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
        </div>
      )}
    </div>
  );
};

export default HeaderCart;
