interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, id, ...props }: CheckboxProps) => {
  return (
    <div className="inline-flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        {...props}
        className="rounded w-3.5 h-3.5 text-yellow-primary cursor-pointer"
      />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
