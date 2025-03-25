import LimitContext from "@/contexts/LimitContext";
import { useContext } from "react";

const useLimit = () => useContext(LimitContext);

export default useLimit;
