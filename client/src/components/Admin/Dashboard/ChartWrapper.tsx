import cn from "@/utils/cn";
import { PropsWithChildren } from "react";

interface ChartWrapperProps extends PropsWithChildren {
  quantity: number | string;
  title: string;
  percent?: {
    value: number;
    isGrowing: boolean;
  };
  report: string;
  className?: string;
}

const ChartWrapper = ({
  quantity,
  title,
  percent,
  className,
  children,
}: ChartWrapperProps) => {
  return (
    <div
      className={cn(
        "p-4 border-gray-600 border rounded-lg shadow-sm sm:p-6 bg-emerald-secondary",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold leading-none sm:text-2xl text-white">
            {quantity}
          </span>
          <h3 className="text-base font-light text-gray-400">{title}</h3>
        </div>
        {percent && (
          <div
            className={cn(
              "flex items-center justify-end flex-1 text-base font-medium text-red-400",
              percent.isGrowing && "text-green-400"
            )}
          >
            {percent.value.toFixed(1)}%
            {percent.isGrowing ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default ChartWrapper;
