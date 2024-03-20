import { AngleDown, AngleUp } from "@/icons";
import { useAppSelector } from "@/store/hooks";
import formatVnd from "@/utils/formatVnd";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FloatingLabel from "../Form/FloatingLabel";
import Button from "../Form/Button";
import cn from "@/utils/cn";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { count, subTotal, carts } = useAppSelector((state) => state.cart);
  const [isShowProducts, setIsShowProducts] = useState(false);
  const [coupon, setCoupon] = useState("");

  const toggleShowProducts = () => {
    setIsShowProducts(!isShowProducts);
  };

  const shippingFee = 40000;

  const total = subTotal + shippingFee;

  return (
    <aside className="text-[rgb(113,113,113)] bg-[rgb(250,250,250)] lg:w-1/3 lg:h-screen">
      {/* Sidebar Header Mobile */}
      <header className="w-full flex lg:hidden justify-between p-4 border-b border-b-[rgb(225,225,225)]">
        <button type="button" onClick={toggleShowProducts}>
          <div className="flex items-center">
            <h1 className="font-semibold text-lg leading-none text-[rgb(51,51,51)]">
              Đơn hàng ({count} sản phẩm)
            </h1>
            {isShowProducts ? (
              <AngleUp className="w-4 h-4 ml-2" />
            ) : (
              <AngleDown className="w-4 h-4 ml-2" />
            )}
          </div>
        </button>
        <span className="font-semibold text-blue-500 text-base leading-none">
          {formatVnd(total)}
        </span>
      </header>

      {/* Sidebar Header Desktop */}
      <header className="pl-5 py-5 border-b border-b-[rgb(225,225,225)] hidden lg:block">
        <h1 className="font-semibold text-lg leading-none text-[rgb(51,51,51)]">
          Đơn hàng ({count} sản phẩm)
        </h1>
      </header>

      {/* Sidebar Content */}
      <div className="px-4">
        <ul
          className={cn(
            "py-2 max-h-60 overflow-y-auto",
            !isShowProducts && "hidden lg:block"
          )}
        >
          {carts.map((cart) => (
            <li
              key={cart._id}
              className="flex items-center justify-between pt-2.5"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <LazyLoadImage
                    src={cart.images[0].url}
                    alt={cart.title}
                    effect="opacity"
                    className="w-14 h-14 rounded-lg"
                  />
                  <span className="text-sm rounded-full w-5 h-5 leading-5 text-center absolute -top-2 -right-2 text-white bg-blue-500">
                    {cart.quantity}
                  </span>
                </div>
                <p className="text-[rgb(51,51,51)] font-medium">{cart.title}</p>
              </div>
              <span className="pl-4">
                {formatVnd(cart.discountedPrice * cart.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center py-4 border-y border-y-[rgb(225,225,225)]">
          <FloatingLabel
            type="text"
            id="coupon"
            onChange={(e) => setCoupon(e.target.value)}
            label="Nhập mã giảm giá"
            wrapperClassName="w-full"
          />
          <Button
            type="button"
            disabled={coupon.length < 1}
            inactive={coupon.length < 1 ? "opacity" : "noOpacity"}
            intent="secondary"
            size="medium"
            className="ml-3"
          >
            Áp dụng
          </Button>
        </div>

        <div className={cn("py-4", !isShowProducts && "hidden lg:block")}>
          <div className="flex items-center justify-between pt-3">
            <p>Tạm tính</p>
            <span>{formatVnd(subTotal)}</span>
          </div>
          <div className="flex items-center justify-between pt-3 mb-3">
            <p>Phí vận chuyển</p>
            <span>{formatVnd(shippingFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-t-[rgb(225,225,225)]">
            <p>Tổng cộng</p>
            <span className="text-blue-500 text-xl font-medium">
              {formatVnd(total)}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between">
          <Link to="/gio-hang" className="text-center text-blue-500 block">
            <span> Quay lại giỏ hàng</span>
          </Link>
          <Button
            type="submit"
            intent={"secondary"}
            size={"medium"}
            inactive={"noOpacity"}
          >
            ĐẶT HÀNG
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
