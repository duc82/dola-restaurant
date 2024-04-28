import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useProductQuickview from "./useProductQuickview";

interface QuantityProps {
  min?: number;
  max?: number;
}

const useQuantity = ({ min = 1, max = 999 }: QuantityProps) => {
  const { isOpen } = useProductQuickview();
  const [quantity, setQuantity] = useState<string>(min.toString());

  const handleIncreaseQuantity = useCallback(() => {
    const newQuantity = quantity ? +quantity + 1 : 1;
    if (newQuantity > max) return;

    setQuantity(newQuantity.toString());
  }, [max, quantity]);

  const handleDecreaseQuantity = useCallback(() => {
    const newQuantity = quantity ? +quantity - 1 : 1;
    if (newQuantity < min) return;

    setQuantity(newQuantity.toString());
  }, [min, quantity]);

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (+value > max) {
      return;
    }
    setQuantity(value);
  };

  const resetQuantity = useCallback(() => {
    setQuantity(min.toString());
  }, [min]);

  useEffect(() => {
    if (isOpen) {
      resetQuantity();
    }
  }, [isOpen, resetQuantity]);

  return {
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleChangeQuantity,
    resetQuantity,
  };
};

export default useQuantity;
