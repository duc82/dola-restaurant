import { twMerge } from "tailwind-merge";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  wrapperClassName?: string;
}

const Radio = ({ wrapperClassName, label, id, ...props }: RadioProps) => {
  return (
    <div className={twMerge("p-3 flex items-center", wrapperClassName)}>
      <input
        type="radio"
        id={id}
        {...props}
        className="w-[18px] h-[18px] cursor-pointer mr-2.5"
      />

      <label htmlFor={id} className="w-full cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Radio;
