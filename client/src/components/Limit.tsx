import limits from "@/data/limits.json";
import cn from "@/utils/cn";

const Limit = ({
  activeLimit,
  handleClick,
}: {
  activeLimit: number;
  handleClick: (limit: number) => void;
}) => {
  return (
    <div className="flex items-center space-x-4">
      <ul className="flex items-center space-x-1.5">
        {limits.map((limit) => (
          <li key={limit}>
            <button
              type="button"
              className={cn(
                "cursor-pointer w-9 h-9 leading-9 rounded-lg text-white hover:bg-yellow-primary hover:border-yellow-primary text-center border border-white flex items-center justify-center",
                limit === activeLimit &&
                  "bg-yellow-primary border-yellow-primary"
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
