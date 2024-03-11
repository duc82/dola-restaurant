import { createContext, useContext, useState } from "react";
import { ChildrenProps } from "../types";
import { Cart } from "@/types/cart";

interface AddedCartContextType {
  active: boolean;
  closeModalCart: () => void;
  updateAddedCart: (cart: Cart) => void;
  addedCart: Cart | null;
}

const AddedCartContext = createContext<AddedCartContextType>({
  active: false,
  closeModalCart: () => {},
  updateAddedCart: () => {},
  addedCart: null,
});

export const AddedCartProvider = ({ children }: ChildrenProps) => {
  const [active, setActive] = useState(false);
  const [addedCart, setAddedCart] = useState<Cart | null>(null);

  const closeModalCart = () => {
    setActive(false);
  };

  const updateAddedCart = (cart: Cart) => {
    setActive(true);
    setAddedCart(cart);
  };

  return (
    <AddedCartContext.Provider
      value={{ active, closeModalCart, addedCart, updateAddedCart }}
    >
      {children}
    </AddedCartContext.Provider>
  );
};

export const useModalCart = () => useContext(AddedCartContext);
