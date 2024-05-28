import CategoryContext from "@/contexts/CategoryContex";
import { useContext } from "react";

const useCategory = () => useContext(CategoryContext);

export default useCategory;
