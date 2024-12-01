import { twMerge } from "tailwind-merge";

interface FloatingLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
}

const FloatingLabel = ({
  wrapperClassName,
  inputClassName,
  labelClassName,
  label,
  id,
  error,
  ...props
}: FloatingLabelProps) => {
  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={twMerge(
            "block px-5 pb-1 pt-4 h-11 w-full text-sm bg-white border-1 border-gray-300 rounded-md appearance-none focus:ring-1 focus:ring-yellow-primary focus:border-yellow-secondary transition peer",
            inputClassName
          )}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={twMerge(
            "absolute text-sm text-[rgb(130,130,130)] start-5 top-3 -translate-y-3 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto duration-300 will-change-transform cursor-text pointer-events-none",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-[red] mt-2 text-xs">{error}</p>}
    </div>
  );
};

export default FloatingLabel;
