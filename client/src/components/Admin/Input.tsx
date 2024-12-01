import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
  wrapperClassName?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"] | "currency";
}

const Input = ({
  label,
  error,
  wrapperClassName,
  type,
  ...attribute
}: InputProps) => {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={attribute.id} className="block font-medium text-sm mb-2">
        {label}
      </label>
      <input
        type={!type || type === "currency" ? "text" : type}
        {...attribute}
        onChange={(e) => {
          if (type === "currency") {
            const value = e.target.value.replace(/\D/g, "");

            if (!value) {
              e.target.value = value;
              attribute.onChange?.(e);
              return;
            }
            const currentFormat = parseInt(value).toLocaleString();
            e.target.value = currentFormat;
          }
          attribute.onChange?.(e);
        }}
        className="text-sm p-2.5 rounded-lg w-full bg-emerald-primary border border-gray-600 placeholder:text-gray-400"
      />
      {error && <p className="text-red-500 mt-2 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
