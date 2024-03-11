import { useMemo } from "react";
import cn from "../utils/cn";

interface PaginationProps {
  pageCount: number;
  currentPage?: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
  pageClassName?: string;
  pageActiveClassName?: string;
}

const createRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

const Pagination = ({
  pageCount,
  currentPage = 1,
  siblingCount = 1,
  onPageChange,
  pageClassName,
  pageActiveClassName,
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers > pageCount) {
      return createRange(1, pageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

    const isShowLeft = leftSiblingIndex > 2;
    const isShowRight = rightSiblingIndex < pageCount - 2;

    if (isShowLeft && !isShowRight) {
      const rightCount = 3 + 2 * siblingCount;
      const rightRange = createRange(pageCount - rightCount + 1, pageCount);
      return [1, "DOTS", ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftCount = 3 + 2 * siblingCount;
      const leftRange = createRange(1, leftCount);

      return [...leftRange, "DOTS", pageCount];
    }

    if (isShowLeft && isShowRight) {
      const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
      return [1, "DOTS", ...middleRange, "DOTS", pageCount];
    }

    return [];
  }, [siblingCount, currentPage, pageCount]);

  const pageClasses =
    "cursor-pointer w-9 h-9 leading-9 rounded-lg text-white hover:bg-yellow-primary hover:border-yellow-primary text-center border border-white flex items-center justify-center";

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <nav className="mb-[30px] w-full flex justify-center">
      <ul className="flex items-center space-x-1.5">
        {currentPage > 1 && (
          <li
            className={cn(pageClasses, pageClassName)}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &#171;
          </li>
        )}

        {paginationRange.map((page, i) => {
          if (page === "DOTS")
            return (
              <li key={i} className={cn(pageClasses, "text-lg", pageClassName)}>
                ...
              </li>
            );

          return (
            <li
              key={i}
              className={cn(
                pageClasses,
                pageClassName,
                page === currentPage &&
                  cn(
                    "bg-yellow-primary border-yellow-primary",
                    pageActiveClassName
                  )
              )}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </li>
          );
        })}

        {currentPage < pageCount && (
          <li
            className={cn(pageClasses, pageClassName)}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &#187;
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
