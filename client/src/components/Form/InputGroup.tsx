import { twMerge } from "tailwind-merge";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
}

const InputGroup = ({ error, className, ...attributes }: InputGroupProps) => {
  return (
    <div className="mb-4">
      <input
        {...attributes}
        className={twMerge(
          "w-full rounded-md p-2.5 outline-none text-black border-b-2 border-b-yellow-primary focus:ring-yellow-primary focus:border-yellow-secondary",
          className
        )}
      />
      {error && <p className="text-[red] mt-2 text-xs">{error}</p>}
    </div>
  );
};

export default InputGroup;
