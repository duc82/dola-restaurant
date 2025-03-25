import { ChangeEvent, useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return { search, handleSearch };
};

export default useSearch;
