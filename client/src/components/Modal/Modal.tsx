import { Close } from "@/icons";
import cn from "@/utils/cn";
import React, { useEffect } from "react";

interface ModalProps extends React.PropsWithChildren {
  show: boolean;
  onHide: () => void;
  animation?: boolean;
  contentClassName?: string;
  dialogClassName?: string;
  wrapperClassName?: string;
}

interface ModalHeaderProps extends React.PropsWithChildren {
  closeButton?: boolean;
  onHide?: () => void;
}

interface ModalContentProps extends React.PropsWithChildren {
  className?: string;
}

const ModalTitle = ({ children, className }: ModalContentProps) => (
  <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
);

const ModalHeader = ({
  closeButton = true,
  onHide = () => {},
  children,
}: ModalHeaderProps) => (
  <div className="flex items-center justify-between p-4 rounded-tl-lg rounded-tr-lg border-b border-b-gray-600">
    {children}
    {closeButton && (
      <button type="button" className="close-button" onClick={onHide}>
        <Close className="w-5 h-5" />
      </button>
    )}
  </div>
);

const ModalBody = ({ children, className }: ModalContentProps) => (
  <div className={cn("p-4", className)}>{children}</div>
);

const ModalFooter = ({ children, className }: ModalContentProps) => (
  <div className={cn("p-4 border-t border-t-gray-600", className)}>
    {children}
  </div>
);

const Modal = ({
  show,
  onHide,
  animation = true,
  children,
  wrapperClassName,
  dialogClassName,
  contentClassName,
}: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.removeAttribute("style");
    };
  }, [show]);

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full overflow-x-hidden overflow-y-hidden flex items-center z-[999]",
        animation && "transition-all duration-300 ease-out",
        show ? "bg-black/60 visible" : "bg-none pointer-events-none invisible",
        wrapperClassName
      )}
    >
      <div className="fixed inset-0 w-full h-full" onClick={onHide}></div>
      <div
        className={cn(
          "sm:max-w-lg md:max-w-2xl w-full px-4 mx-auto relative",
          animation && "transition duration-300 ease-out will-change-transform",
          show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10",
          dialogClassName
        )}
      >
        <div
          className={cn(
            "bg-white text-black w-full rounded-lg flex flex-col",
            contentClassName
          )}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;

            if (child.type === ModalHeader) {
              return React.cloneElement(child, {
                onHide,
              } as ModalHeaderProps);
            }

            return React.cloneElement(child);
          })}
        </div>
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;

export default Modal;
