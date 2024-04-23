import { createContext } from "react";

const LimitContext = createContext({
  activeLimit: 5,
  handleChangeLimit: (limit: number, total: number, page: number) => {},
});

export default LimitContext;
