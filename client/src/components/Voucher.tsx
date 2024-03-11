import { LazyLoadImage } from "react-lazy-load-image-component";
import ThumpCheck from "./ThumpCheck";
import Coupon from "./Coupon";
import { useAppSelector } from "../store/hooks";
import cn from "../utils/cn";

interface VoucherProps {
  className?: string;
}

const Voucher = ({ className }: VoucherProps) => {
  const { subTotal } = useAppSelector((state) => state.cart);
  return (
    <div
      className={cn(
        "my-10 px-4 pt-11 pb-1 relative border border-dashed border-yellow-primary rounded-lg",
        className
      )}
    >
      <div className="flex items-center space-x-2.5 text-yellow-primary font-semibold text-lg rounded-[20px] bg-emerald-primary border-2 border-yellow-primary py-1 px-4 absolute -top-5">
        <LazyLoadImage
          src={"/voucher.webp"}
          alt="Voucher"
          effect="opacity"
          width={30}
          height={30}
        />
        <span>Nhận voucher ngay !!!</span>
      </div>
      <ThumpCheck subTotal={subTotal} />
      {/* Coupon */}
      <Coupon subTotal={subTotal} />
    </div>
  );
};

export default Voucher;
