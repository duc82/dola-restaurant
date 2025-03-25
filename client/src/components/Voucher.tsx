import { LazyLoadImage } from "react-lazy-load-image-component";
import ThumpCheck from "./ThumpCheck";
import { useAppSelector } from "../store/hooks";
import cn from "../utils/cn";
import formatVnd from "@/utils/formatVnd";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import voucher from "@/assets/images/voucher.webp";
import { FullVoucher, VoucherType } from "@/types/voucher";
import voucherService from "@/services/voucherService";

interface VoucherProps {
  className?: string;
}

const Voucher = ({ className }: VoucherProps) => {
  const { subTotal, count } = useAppSelector((state) => state.cart);
  const [vouchers, setVouchers] = useState<FullVoucher[]>([]);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    navigator.clipboard.writeText(value);
    toast.success("Sao chép thành công");
  };

  useEffect(() => {
    voucherService.getAll().then((data) => setVouchers(data as FullVoucher[]));
  }, []);

  if (count === 0 || vouchers.length === 0) return null;

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
              key={voucher._id}
              className={cn("mb-4 opacity-50", amount <= 0 && "opacity-100")}
            >
              <div>
                <b className="text-yellow-primary">
                  {amount > 0 ? <>Còn {formatVnd(amount)}</> : "Click"}
                </b>{" "}
                để được nhận mã{" "}
                {voucher.type === VoucherType.DISCOUNT
                  ? `giảm ${formatVnd(voucher.discount)}`
                  : "freeship"}
              </div>
              <button
                type="button"
                value={voucher.code}
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
