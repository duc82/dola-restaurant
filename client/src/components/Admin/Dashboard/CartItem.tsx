import { JSX } from "react";
import CountUp from "react-countup";

interface CartItemProps {
  title: string;
  total: number;
  icon: JSX.Element;
  duration?: number;
  suffix?: string;
}

const CartItem = (props: CartItemProps) => {
  return (
    <div className="rounded-md bg-emerald-secondary p-6 shadow-dropdow">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-primary">
        {props.icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-bold">
            <CountUp
              end={props.total}
              suffix={props.suffix}
              duration={props.duration}
              separator="."
            />
          </h4>
          <span className="text-sm font-medium text-gray-400">
            {props.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
