import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import sorts from "@/data/sorts.json";
import cn from "@/utils/cn";

interface ISort {
  value: string;
  title: string;
}

const Sort = () => {
  const [urlSearchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<ISort>({
    value: urlSearchParams.get("sort") ?? "",
    title:
      sorts.find((sort) => sort.value === urlSearchParams.get("sort"))?.title ??
      sorts[0].title,
  });
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSortChange = (sort: ISort) => {
    setSortBy(sort);
    setIsActiveDropdown(false);
    if (sort.value) {
      urlSearchParams.set("sort", sort.value);
    } else {
      urlSearchParams.delete("sort");
    }
    setSearchParams(urlSearchParams);
  };

  const toggleDropdown = () => setIsActiveDropdown(!isActiveDropdown);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        setIsActiveDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const activeClasses = isActiveDropdown ? "block" : "hidden";

  return (
    <div className="flex items-center justify-between bg-yellow-primary text-white mb-5 pl-2.5 rounded-md lg:float-right lg:w-1/4">
      <label htmlFor="sortBy" className="font-bold leading-[30px]">
        Sắp xếp:
      </label>
      <div
        ref={ref}
        onClick={toggleDropdown}
        className="leading-9 w-1/2 relative px-2.5 bg-select bg-no-repeat bg-[right_10px_center]"
      >
        <span className="cursor-pointer">{sortBy.title}</span>
        <ul
          className={cn(
            "absolute rounded-b-md top-full z-40 left-0 bg-white text-gray-800 w-full",
            activeClasses
          )}
        >
          {sorts.map((sort) => (
            <li
              onClick={() => handleSortChange(sort)}
              key={sort.title}
              className="hover:bg-yellow-primary hover:text-white cursor-pointer px-2.5"
            >
              {sort.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
