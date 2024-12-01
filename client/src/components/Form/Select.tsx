import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  wrapperClassName?: string;
}
interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const Option = ({ ...props }: OptionProps) => {
  return <option {...props}></option>;
};

const Select = ({ label, id, wrapperClassName, ...props }: SelectProps) => {
  return (
    <div className={twMerge("w-full", wrapperClassName)}>
      <label
        htmlFor={id}
        className="block mb-0.5 text-sm font-medium text-[rgb(130,130,130)]"
      >
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="px-5 h-11 w-full text-sm bg-white border-1 border-gray-300 rounded-md appearance-none focus:ring-1 focus:ring-yellow-primary focus:border-yellow-secondary transition disabled:bg-[rgb(238,238,238)]"
      >
        <Option value="" hidden>
          ---
        </Option>
        {props.children}
      </select>
    </div>
  );
};

Select.Option = Option;

export default Select;
