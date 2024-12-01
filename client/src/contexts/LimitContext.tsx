import { createContext } from "react";

const LimitContext = createContext({
  currentLimit: 5,
  handleChangeLimit: (_limit: number, _total: number, _page: number) => {},
});

export default LimitContext;
