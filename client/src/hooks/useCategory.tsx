import CategoryContext from "@/context/CategoryContex";
import { useContext } from "react";

const useCategory = () => useContext(CategoryContext);

export default useCategory;
