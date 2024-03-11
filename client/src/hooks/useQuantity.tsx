import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useProductQuickview } from "../context/ProductQuickviewContent";

interface QuantityProps {
  min?: number;
  max?: number;
}

const useQuantity = ({ min = 1, max = 999 }: QuantityProps) => {
  const { isActive } = useProductQuickview();
  const [quantity, setQuantity] = useState<string | number>(min.toString());

  const handleIncreaseQuantity = useCallback(() => {
    const newQuantity = quantity ? +quantity + 1 : 1;
    if (newQuantity > max) return;

    setQuantity(newQuantity);
  }, [max, quantity]);

  const handleDecreaseQuantity = useCallback(() => {
    const newQuantity = quantity ? +quantity - 1 : 1;
    if (newQuantity < min) return;

    setQuantity(newQuantity);
  }, [min, quantity]);

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value > max) {
      setQuantity(max);
      return;
    }
    setQuantity(value ? +value : value);
  };

  const resetQuantity = useCallback(() => {
    setQuantity(min);
  }, [min]);

  useEffect(() => {
    if (isActive) {
      resetQuantity();
    }
  }, [isActive, resetQuantity]);

  return {
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleChangeQuantity,
    resetQuantity,
  };
};

export default useQuantity;
