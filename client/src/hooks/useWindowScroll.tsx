import { useEffect, useState } from "react";

const useWindowScroll = () => {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleWindowScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    };
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return scroll;
};

export default useWindowScroll;
