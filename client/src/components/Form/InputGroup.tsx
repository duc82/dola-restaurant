import cn from "@/utils/cn";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  wrapperClassName?: string;
}

const InputGroup = ({
  error,
  className,
  wrapperClassName,
  ...props
}: InputGroupProps) => {
  return (
    <div className={cn("mb-4", wrapperClassName)}>
      <input
        {...props}
        className={cn(
          "w-full rounded-md p-2.5 outline-none text-black border-b-2 border-b-yellow-primary focus:ring-yellow-primary focus:border-yellow-secondary",
          className
        )}
      />
      {error && <p className="text-[red] mt-2 text-xs">{error}</p>}
    </div>
  );
};

export default InputGroup;
