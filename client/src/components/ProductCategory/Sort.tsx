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

  const sort = urlSearchParams.get("sort") ?? "";

  const [sortBy, setSortBy] = useState<ISort>({
    value: sort,
    title: sorts.find((s) => s.value === sort)?.title ?? sorts[0].title,
  });
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (sort: ISort) => {
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
    <div className="relative flex items-center justify-between bg-yellow-primary text-white mb-5 pl-2.5 rounded-md lg:absolute lg:top-[1px] lg:right-0 text-nowrap">
      <label htmlFor="sortBy" className="font-bold leading-[30px]">
        Sắp xếp:
      </label>
      <div
        ref={ref}
        onClick={toggleDropdown}
        className="leading-9 px-2.5 pr-7 bg-select bg-no-repeat bg-[right_10px_center]"
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
              onClick={() => handleChange(sort)}
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
