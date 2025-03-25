import useWindowScroll from "../hooks/useWindowScroll";
import { Up } from "../icons";
import cn from "../utils/cn";

const ScrollTop = () => {
  const { y } = useWindowScroll();

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Lên đầu trang"
      type="button"
      className={cn(
        "fixed bottom-[50px] right-5 w-10 h-10 bg-yellow-primary text-white flex items-center justify-center leading-10 z-[999] rounded-lg transition-all duration-300 cursor-pointer hover:bg-yellow-secondary opacity-0 invisible",
        y > 50 && "opacity-100 visible"
      )}
    >
      <Up className="w-5 h-5 stroke-white stroke-1" />
    </button>
  );
};

export default ScrollTop;
