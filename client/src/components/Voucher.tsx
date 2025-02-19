import { LazyLoadImage } from "react-lazy-load-image-component";
import ThumpCheck from "./ThumpCheck";
import { useAppSelector } from "../store/hooks";
import cn from "../utils/cn";
import formatVnd from "@/utils/formatVnd";
import { MouseEvent } from "react";
import toast from "react-hot-toast";
import voucher from "@/assets/images/voucher.webp";

interface VoucherProps {
  className?: string;
}

const vouchers = [
  {
    id: 1,
    minAmount: 300000,
    text: "để được nhận mã freeship",
    value: "FREESHIP",
  },
  {
    id: 2,
    minAmount: 700000,
    text: "để được nhận mã giảm 20.000₫",
    value: "DOLA10",
  },
  {
    id: 3,
    minAmount: 1000000,
    text: "để được nhận mã giảm 50.000₫",
    value: "DOLA50",
  },
];

const Voucher = ({ className }: VoucherProps) => {
  const { subTotal, count } = useAppSelector((state) => state.cart);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    navigator.clipboard.writeText(value);
    toast.success("Sao chép thành công");
  };

  if (count === 0) return null;

  return (
    <div
      className={cn(
        "my-10 px-4 pt-11 pb-1 relative border border-dashed border-yellow-primary rounded-lg",
        className
      )}
    >
      <div className="flex items-center space-x-2.5 text-yellow-primary font-semibold text-lg rounded-[20px] bg-emerald-primary border-2 border-yellow-primary py-1 px-4 absolute -top-5">
        <LazyLoadImage
          src={voucher}
          alt="Voucher"
          effect="opacity"
          width={30}
          height={30}
        />
        <span>Nhận voucher ngay !!!</span>
      </div>
      <ThumpCheck subTotal={subTotal} />
      <ul className="mt-5 pl-5 text-base list-disc">
        {vouchers.map((voucher) => {
          const amount = voucher.minAmount - subTotal;

          return (
            <li
              key={voucher.id}
              className={cn("mb-4 opacity-50", amount <= 0 && "opacity-100")}
            >
              <div>
                <b className="text-yellow-primary">
                  {amount > 0 ? <>Còn {formatVnd(amount)}</> : "Click"}
                </b>{" "}
                {voucher.text}
              </div>

              <button
                type="button"
                value={voucher.value}
                onClick={handleCopy}
                className={cn(
                  "py-1.5 px-2.5 rounded-lg mt-1 bg-yellow-primary hover:bg-yellow-secondary pointer-events-none cursor-default",
                  amount <= 0 && "pointer-events-auto cursor-pointer"
                )}
              >
                Sao chép
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Voucher;
