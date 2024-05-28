import { createContext } from "react";

const LimitContext = createContext({
  currentLimit: 5,
  handleChangeLimit: (limit: number, total: number, page: number) => {},
});

export default LimitContext;
