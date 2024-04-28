import { FullCategory } from "@/types/category";
import { createContext } from "react";

const CategoryContext = createContext({
  parentCategories: [] as FullCategory[],
});

export default CategoryContext;
