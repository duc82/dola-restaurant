import { TextareaHTMLAttributes } from "react";
import cn from "../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
  wrapperClassName?: string;
}

const TextArea = ({
  error,
  className,
  wrapperClassName,
  ...props
}: TextAreaProps) => {
  return (
    <div className={cn("mb-2.5", wrapperClassName)}>
      <textarea
        {...props}
        className={cn(
          "w-full h-full rounded-md p-2.5 outline-none text-black border-b-2 border-b-yellow-primary",
          className
        )}
      ></textarea>
      {error && <p className="text-[red] mt-2 text-xs">{error}</p>}
    </div>
  );
};

export default TextArea;
