interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  wrapperClassName?: string;
}

const Option = ({
  children,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) => (
  <option {...props}>{children}</option>
);

const Select = ({ label, wrapperClassName, ...props }: SelectProps) => {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={props.id} className="block font-medium text-sm mb-2">
        {label}
      </label>
      <select
        className="text-sm p-2.5 rounded-lg w-full bg-emerald-primary border border-gray-600 placeholder:text-gray-400"
        {...props}
      >
        {props.children}
      </select>
    </div>
  );
};

Select.Option = Option;

export default Select;
