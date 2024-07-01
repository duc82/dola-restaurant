import { Spinner } from "@/icons";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  hasSpinner?: boolean;
  isLoading?: boolean;
}

const button = cva(
  ["rounded-md flex justify-center items-center transition-all duration-200"],
  {
    variants: {
      intent: {
        primary: ["bg-yellow-primary", "text-white"],
        secondary: ["bg-blue-600", "text-white", "opacity-60"],
        outline: ["bg-none"],
      },
      size: {
        none: ["text-sm"],
        small: ["p-2.5 text-base w-full"],
        medium: ["px-6 py-3 font-medium text-sm flex-none"],
      },
      inactive: {
        cursorNotAllowed: "cursor-not-allowed",
        primaryHover: "hover:bg-yellow-secondary",
        opacity: "opacity-60",
        noOpacity: "opacity-100",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "small",
      inactive: null,
    },
  }
);

const Button = ({
  intent,
  size,
  className,
  inactive,
  hasSpinner = true,
  isLoading = false,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    {...props}
    className={twMerge(button({ intent, size, inactive, className }))}
  >
    {(props.disabled && hasSpinner) || isLoading ? (
      <div className="flex items-center space-x-2">
        <Spinner className="w-5 h-5 animate-spin" />
        <span>Đang tải</span>
      </div>
    ) : (
      props.children
    )}
  </button>
);

export default Button;
