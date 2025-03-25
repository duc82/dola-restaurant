import productService from "@/services/productService";
import { FullProduct } from "@/types/product";
import debounce from "@/utils/debounce";
import { ChangeEvent, useCallback, useState } from "react";

interface Options {
  debounceDelay: number;
}

const useSearchProduct = (options?: Options) => {
  const debounceDelay = options?.debounceDelay ?? 500;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<FullProduct[]>([]);

  const resetSearch = () => {
    setSearch("");
    setProducts([]);
  };

  const debounceSearch = debounce(async (value: string) => {
    if (!value) return setProducts([]);
    try {
      const data = await productService.getAll({
        search,
        limit: 4,
      });
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  }, debounceDelay);

  const getResults = useCallback(
    (value: string) => debounceSearch(value),
    [debounceSearch]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    getResults(value);
  };

  return { search, products, resetSearch, handleSearchChange };
};

export default useSearchProduct;
