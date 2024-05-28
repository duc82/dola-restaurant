import { createContext, useContext, useState } from "react";
import { Cart } from "@/types/cart";

interface AddedCartContextType {
  isOpen: boolean;
  closeModalCart: () => void;
  updateAddedCart: (cart: Cart) => void;
  addedCart: Cart | null;
}

const AddedCartContext = createContext<AddedCartContextType>({
  isOpen: false,
  closeModalCart: () => {},
  updateAddedCart: () => {},
  addedCart: null,
});

export const AddedCartProvider = ({ children }: React.PropsWithChildren) => {
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
    <AddedCartContext.Provider
      value={{ isOpen, closeModalCart, addedCart, updateAddedCart }}
    >
      {children}
    </AddedCartContext.Provider>
  );
};

export const useModalCart = () => useContext(AddedCartContext);
