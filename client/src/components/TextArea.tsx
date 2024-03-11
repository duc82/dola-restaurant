import { TextareaHTMLAttributes } from "react";
import cn from "../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
}

const TextArea = ({ error, className, ...attributes }: TextAreaProps) => {
  return (
    <div className="mb-2.5">
      <textarea
        {...attributes}
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
