import limits from "@/data/limits.json";
import cn from "@/utils/cn";

const Limit = ({
  currentLimit,
  handleClick,
  variant = "yellow",
}: {
  currentLimit: number;
  handleClick: (limit: number) => void;
  variant?: "yellow" | "blue";
}) => {
  const limitVariants = {
    yellow: {
      default: "bg-yellow-primary border-yellow-primary",
      hover: "hover:bg-yellow-primary hover:border-yellow-primary",
    },
    blue: {
      default: "bg-blue-600 border-blue-600",
      hover: "hover:bg-blue-600 hover:border-blue-600",
    },
  };

  return (
    <div className="flex items-center space-x-4">
      <ul className="flex items-center space-x-1.5">
        {limits.map((limit) => (
          <li key={limit}>
            <button
              type="button"
              className={cn(
                "cursor-pointer w-9 h-9 leading-9 rounded-lg text-white text-center border border-white flex items-center justify-center",
                limit === currentLimit
                  ? limitVariants[variant].default
                  : limitVariants[variant].hover
              )}
              onClick={() => handleClick(limit)}
            >
              {limit}
            </button>
          </li>
        ))}
      </ul>
      <span className="text-sm">mỗi trang</span>
    </div>
  );
};

export default Limit;
