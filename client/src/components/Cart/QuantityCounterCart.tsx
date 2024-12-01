import { ChangeEvent } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from "../../store/reducers/cartSlice";
import type { Cart } from "@/types/cart";

interface QuantityCounterCartProps {
  disabledLabel?: boolean;
  cart: Cart;
}

const QuantityCounterCart = ({
  disabledLabel = false,
  cart,
}: QuantityCounterCartProps) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (cart: Cart) => {
    if (cart.quantity >= cart.stock) return;
    dispatch(increaseQuantity({ ...cart, quantity: 1 }));
  };

  const handleDecreaseQuantity = (cart: Cart) => {
    dispatch(decreaseQuantity({ ...cart, quantity: 1 }));
  };

  const handleChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    cart: Cart
  ) => {
    const newQuantity = e.target.value.replace(/\D/, ""); // allow number only
    if (+newQuantity > cart.stock) {
      return;
    }

    if (newQuantity) {
      dispatch(changeQuantity({ ...cart, quantity: +newQuantity }));
    }
  };

  return (
    <>
      {!disabledLabel && (
        <label htmlFor="quantity" className="block text-[13px] mb-1">
          Số lượng
        </label>
      )}
      <div className="inline-flex justify-center items-center space-x-1.5 text-black">
        <button
          type="button"
          title="Tăng"
          className="text-xl w-6 h-6 rounded-md bg-yellow-primary text-white flex items-center justify-center"
          onClick={() => handleDecreaseQuantity(cart)}
        >
          -
        </button>
        <input
          type="text"
          name="quantity"
          id="quantityCart"
          value={cart.quantity}
          className="w-10 h-6 p-0 text-center border border-yellow-primary rounded-md text-sm"
          onChange={(e) => handleChangeQuantity(e, cart)}
          autoComplete="off"
        />
        <button
          type="button"
          title="Giảm"
          className="text-xl w-6 h-6 rounded-md bg-yellow-primary text-white flex items-center justify-center"
          onClick={() => handleIncreaseQuantity(cart)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantityCounterCart;
