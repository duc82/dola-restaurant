import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import formatVnd from "@/utils/formatVnd";
import { useModalCart } from "@/providers/CartProvider";
import cn from "@/utils/cn";
import { useAppSelector } from "@/store/hooks";
import Overlay from "../Overlay";

const ModalCart = () => {
  const { carts } = useAppSelector((state) => state.cart);
  const { isOpen, closeModalCart, addedCart } = useModalCart();

  const count = carts.length;

  return (
    <div
      className={cn("fixed inset-0 z-[9999] invisible", isOpen && "visible")}
    >
      <Overlay show={isOpen} onClick={closeModalCart} />
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-0 right-0 max-w-[300px] sm:max-w-[450px] mx-auto bg-emerald-primary border border-yellow-primary rounded-md z-[2000] opacity-0 scale-90 will-change-transform transition-all duration-300",
          isOpen && "opacity-100 scale-100"
        )}
      >
        <div className="flex items-center justify-between p-2.5 bg-yellow-primary text-white font-bold">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={20}
              viewBox="-21 -21 682.66669 682.66669"
              width={20}
              className="invert"
            >
              <path d="m322.820312 387.933594 279.949219-307.273438 36.957031 33.671875-314.339843 345.023438-171.363281-162.902344 34.453124-36.238281zm297.492188-178.867188-38.988281 42.929688c5.660156 21.734375 8.675781 44.523437 8.675781 68.003906 0 148.875-121.125 270-270 270s-270-121.125-270-270 121.125-270 270-270c68.96875 0 131.96875 26.007812 179.746094 68.710938l33.707031-37.113282c-58.761719-52.738281-133.886719-81.597656-213.453125-81.597656-85.472656 0-165.835938 33.285156-226.273438 93.726562-60.441406 60.4375-93.726562 140.800782-93.726562 226.273438s33.285156 165.835938 93.726562 226.273438c60.4375 60.441406 140.800782 93.726562 226.273438 93.726562s165.835938-33.285156 226.273438-93.726562c60.441406-60.4375 93.726562-140.800782 93.726562-226.273438 0-38.46875-6.761719-75.890625-19.6875-110.933594zm0 0"></path>
            </svg>
            <span>Thêm vào thành công</span>
          </div>
          <button type="button" className="group" onClick={closeModalCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width={16}
              height={16}
              viewBox="0 0 512.001 512.001"
              xmlSpace="preserve"
              className="invert group-hover:rotate-90 transition-transform duration-300"
            >
              <g>
                <g>
                  <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z"></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div>
          <div className="flex space-x-4 border-b border-b-yellow-primary p-2.5">
            <LazyLoadImage
              src={addedCart?.images[0].url}
              alt={addedCart?.title}
              effect="opacity"
              wrapperClassName="flex-none !block"
              width={80}
              height={80}
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{addedCart?.title}</h4>
              <p className="text-yellow-primary font-semibold text-base">
                {formatVnd(addedCart?.discountedPrice)}
              </p>
            </div>
          </div>
          <div className="p-2.5">
            <p className="mb-2.5">
              Giỏ hàng của bạn hiện có (
              <span className="text-yellow-primary">{count}</span> món ăn)
            </p>
            <div className="flex flex-col lg:flex-row gap-2.5">
              <button
                type="button"
                onClick={closeModalCart}
                className="w-full h-10 rounded-md text-center bg-zinc-500 border border-zinc-500 hover:bg-zinc-700"
              >
                Tiếp tục mua hàng
              </button>
              <Link
                to="/thanh-toan"
                className="w-full flex items-center justify-center h-10 rounded-md text-center border border-yellow-primary bg-yellow-primary hover:bg-yellow-secondary"
              >
                Thanh toán ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
