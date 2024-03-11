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
    dispatch(increaseQuantity({ ...cart, quantity: 1 }));
  };

  const handleDecreaseQuantity = (cart: Cart) => {
    dispatch(decreaseQuantity({ ...cart, quantity: 1 }));
  };

  const handleChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    cart: Cart
  ) => {
    const newQuantity = e.target.value.split(/\D/).join(""); // allow number only
    dispatch(changeQuantity({ ...cart, quantity: +newQuantity }));
  };

  return (
    <>
      {!disabledLabel && (
        <label htmlFor="quantity" className="block text-[13px] mb-1">
          Số lượng
        </label>
      )}
      <div className="inline-flex space-x-1.5">
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
          value={cart.quantity}
          name="quantity"
          id="quantityCart"
          maxLength={3}
          className="text-black w-10 h-6 px-2 py-0 border border-yellow-primary text-center rounded-md text-sm focus:outline-none"
          onChange={(e) => handleChangeQuantity(e, cart)}
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
