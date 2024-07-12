import { ArrowDown, ArrowUp } from "@/icons";
import cn from "@/utils/cn";

interface CartItemProps {
  title: string;
  total: number | string;
  percentage: {
    value: number;
    increase: boolean;
  };
  icon: JSX.Element;
}

const CartItem = (props: CartItemProps) => {
  return (
    <div className="rounded-md bg-emerald-secondary p-6 shadow-dropdow">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-primary">
        {props.icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-bold">{props.total}</h4>
          <span className="text-sm font-medium text-gray-400">
            {props.title}
          </span>
        </div>

        <span
          className={cn(
            "flex items-center gap-1 text-sm font-medium text-green-500",
            !props.percentage.increase && "text-red-500"
          )}
        >
          {props.percentage.value}%
          {props.percentage.increase ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
