import LimitContext from "@/contexts/LimitContext";
import limits from "@/data/limits.json";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const LimitProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLimit, setCurrentLimit] = useState(limits[0]);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const handleChangeLimit = (limit: number, total: number, page: number) => {
    setCurrentLimit(limit);
    const pageCount = Math.ceil(total / limit);
    if (page > pageCount) {
      urlSearchParams.set("page", pageCount.toString());
      setUrlSearchParams(urlSearchParams);
    }
  };

  return (
    <LimitContext.Provider value={{ currentLimit, handleChangeLimit }}>
      {children}
    </LimitContext.Provider>
  );
};

export default LimitProvider;
