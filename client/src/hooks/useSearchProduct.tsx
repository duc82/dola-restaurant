import productService from "@/services/productService";
import { FullProduct } from "@/types/product";
import { ChangeEvent, useEffect, useState } from "react";

interface Options {
  debounceDelay: number;
}

const useSearchProduct = (options?: Options) => {
  const debounceDelay = options?.debounceDelay ?? 300;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<FullProduct[]>([]);

  const resetSearch = () => {
    setSearch("");
    setProducts([]);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const debounceTimeOut = setTimeout(async () => {
      if (!search) {
        setProducts([]);
        return;
      }
      const data = await productService.getAll({
        query: `search=${search}`,
        limit: 4,
      });
      setProducts(data.products);
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimeOut);
    };
  }, [search, debounceDelay]);

  return { search, products, resetSearch, handleSearchChange };
};

export default useSearchProduct;
