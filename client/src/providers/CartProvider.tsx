import { createContext, useContext, useState } from "react";
import { Cart } from "@/types/cart";

interface CartContextState {
  isOpen: boolean;
  closeModalCart: () => void;
  updateAddedCart: (cart: Cart) => void;
  addedCart: Cart | null;
}

const CartContext = createContext<CartContextState>({
  isOpen: false,
  closeModalCart: () => {},
  updateAddedCart: () => {},
  addedCart: null,
});

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addedCart, setAddedCart] = useState<Cart | null>(null);

  const closeModalCart = () => {
    setIsOpen(false);
  };

  const updateAddedCart = (cart: Cart) => {
    setIsOpen(true);
    setAddedCart(cart);
  };

  return (
    <CartContext.Provider
      value={{ isOpen, closeModalCart, addedCart, updateAddedCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useModalCart = () => useContext(CartContext);
