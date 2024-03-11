import { memo } from "react";
import cn from "../utils/cn";

interface OverlayProps {
  active: boolean;
  onClick?: () => void;
  className?: string;
}

const Overlay = ({ active, onClick, className }: OverlayProps) => {
  const activeClasses = active ? "visible opacity-100" : "invisible opacity-0";
  return (
    <div
      onClick={onClick}
      className={cn(
        "fixed top-0 left-0 w-full h-full z-[9999] bg-black/80 transition-[visibility,opacity] duration-300",
        activeClasses,
        className
      )}
    ></div>
  );
};

export default memo(Overlay);
