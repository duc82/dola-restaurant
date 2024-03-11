import { MouseEvent } from "react";
import formatVnd from "../utils/formatVnd";
import { toast } from "react-hot-toast";
import cn from "../utils/cn";

interface CouponProps {
  subTotal: number;
}

const vouchers = [
  {
    id: 1,
    cost: 300000,
    text: "để được nhận mã freeship",
    value: "FREESHIP",
  },
  {
    id: 2,
    cost: 700000,
    text: "để được nhận mã giảm 20.000₫",
    value: "DOLA10",
  },
  {
    id: 3,
    cost: 1000000,
    text: "để được nhận mã giảm 50.000₫",
    value: "DOLA50",
  },
];

const Coupon = ({ subTotal }: CouponProps) => {
  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    navigator.clipboard.writeText(value);
    toast.success("Sao chép thành công");
  };

  return (
    <ul className="mt-5 pl-5 text-base list-disc">
      {vouchers.map((voucher) => {
        const newCost = voucher.cost - subTotal;
        return (
          <li
            key={voucher.id}
            className={cn("mb-4", "opacity-50" && newCost > 0)}
          >
            <div>
              <b className="text-yellow-primary">
                {newCost > 0 ? <>Còn {formatVnd(newCost)}</> : "Click"}
              </b>{" "}
              {voucher.text}
            </div>

            <button
              type="button"
              value={voucher.value}
              onClick={handleCopy}
              className={cn(
                "py-1.5 px-2.5 rounded-lg mt-1 bg-yellow-primary hover:bg-yellow-secondary",
                "pointer-events-none cursor-default" && newCost > 0
              )}
            >
              Sao chép
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Coupon;
