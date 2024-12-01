import cn from "../utils/cn";

interface ThumpCheckProps {
  subTotal: number;
}

const maxVoucher = 1000000;

const ThumpCheck = ({ subTotal }: ThumpCheckProps) => {
  if (subTotal > maxVoucher) subTotal = maxVoucher;
  const onePercent = (maxVoucher * 1) / 100;
  const width = subTotal / onePercent;

  const dot1ActiveClasses = width >= 30 ? "bg-yellow-primary" : "bg-gray-200";
  const dot2ActiveClasses = width >= 70 ? "bg-yellow-primary" : "bg-gray-200";
  const dot3ActiveClasses = width >= 100 ? "bg-yellow-primary" : "bg-gray-200";

  return (
    <div className="relative">
      <div className="w-full block h-2 rounded-md bg-white"></div>
      <div
        className="absolute top-0 h-2 rounded-md bg-yellow-primary bg-linear-transparent animate-progressBarFill"
        style={{ width: `${width}%` }}
      ></div>
      <div
        className={cn(
          "absolute w-4 h-4 top-1/2 -translate-y-1/2 left-[calc(30%-10px)] rounded-full transition easa duration-[600ms] animate-pulseSmall",
          dot1ActiveClasses
        )}
      ></div>
      <div
        className={cn(
          "absolute w-4 h-4 top-1/2 -translate-y-1/2 left-[calc(70%-10px)] rounded-full transition easa duration-[600ms] animate-pulseSmall",
          dot2ActiveClasses
        )}
      ></div>
      <div
        className={cn(
          "absolute w-4 h-4 top-1/2 -translate-y-1/2 left-[calc(100%-10px)] rounded-full transition easa duration-[600ms] animate-pulseSmall",
          dot3ActiveClasses
        )}
      ></div>
    </div>
  );
};

export default ThumpCheck;
