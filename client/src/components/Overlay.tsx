import cn from "../utils/cn";

interface OverlayProps {
  show: boolean;
  className?: string;
  onClick?: () => void;
}

const Overlay = ({ className, show, onClick }: OverlayProps) => {
  const showClasses = show ? "visible opacity-100" : "invisible opacity-0";

  return (
    <div
      onClick={onClick}
      className={cn(
        "fixed top-0 left-0 w-full h-full z-[1000] bg-black/50 transition-[visibility,opacity] duration-300",
        showClasses,
        className
      )}
    ></div>
  );
};

export default Overlay;
