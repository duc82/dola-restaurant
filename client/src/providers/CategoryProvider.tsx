import CategoryContext from "@/contexts/CategoryContex";
import categoryService from "@/services/categoryService";
import { FullCategory } from "@/types/category";
import { useEffect, useState } from "react";

const CategoryProvider = ({ children }: React.PropsWithChildren) => {
  const [parentCategories, setParentCategories] = useState<FullCategory[]>([]);

  useEffect(() => {
    categoryService
      .getAllParents()
      .then((data) => {
        setParentCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CategoryContext.Provider value={{ parentCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
