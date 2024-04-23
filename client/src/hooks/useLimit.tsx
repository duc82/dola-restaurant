import LimitContext from "@/context/LimitContext";
import { useContext } from "react";

const useLimit = () => useContext(LimitContext);

export default useLimit;
