import cn from "@/utils/cn";
import {
  ChangeEvent,
  ClipboardEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface OtpInputProps {
  onChange: Dispatch<SetStateAction<string>>;
  length?: number;
  className?: string;
}

const OtpInput = ({ onChange, length = 6, className }: OtpInputProps) => {
  const [otps, setOtps] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value.replace(/\D/, "");
    const newOtps = [...otps];
    newOtps[i] = value;
    setOtps(newOtps);

    if (value !== "") {
      if (i < length - 1) {
        refs.current[i + 1].focus();
      }
    } else {
      if (i > 0) {
        refs.current[i - 1].focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, length - otps.join("").length)
      .split("");

    const newOtps = [...otps];
    refs.current.forEach((ref, index) => {
      if (pastedData.length > 0) {
        newOtps[index] = pastedData.shift()!;
        ref.value = newOtps[index];
        ref.focus();
      }
    });
    setOtps(newOtps);
  };

  useEffect(() => {
    onChange(otps.join(""));
  }, [otps, onChange]);

  return (
    <div className="flex items-center justify-center">
      {otps.map((otp, i) => (
        <input
          type="text"
          key={i}
          ref={(el) => {
            if (!el) return;
            refs.current[i] = el;
          }}
          value={otp}
          maxLength={1}
          onChange={(e) => handleChange(e, i)}
          onPaste={handlePaste}
          className={cn(
            "rounded-lg border shadow-sm border-white font-bold text-base py-1 px-2 mr-4 w-10 h-10 text-black outline-none text-center",
            className
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;
