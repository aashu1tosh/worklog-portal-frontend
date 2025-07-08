import { CancelButton } from "@/components/ui/button";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

const Modal = ({
  open,
  setOpen,
  title,
  children,
  showFooter,
  footerButton,
  size = "md",
  onSubmit,
  hideCloseButton,
  closeOnOutsideClick = false,
  onHandleClose,
  type,
}: {
  open: boolean;
  setOpen?: (data: boolean) => void;
  title?: string;
  children?: ReactNode;
  showFooter?: boolean;
  footerButton?: ReactNode;
  size?: "sm" | "md" | "xl" | "lg";
  onSubmit?: (data: any) => void;
  hideCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  onHandleClose?: () => void;
  type?: "DELETE";
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [wasOpen, setWasOpen] = useState(open);
  const closeTriggeredRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeTriggeredRef.current = true;
        if (setOpen) setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (wasOpen && !open) {
      if (onHandleClose) {
        onHandleClose();
      }
      closeTriggeredRef.current = false;
    }
    setWasOpen(open);
  }, [open, wasOpen, onHandleClose]);

  if (!open) return null;

  const handleModalClose = () => {
    closeTriggeredRef.current = true;
    if (setOpen) setOpen(false);
  };

  const getModalSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "lg:w-1/3 md:w-[60%] w-[95%] max-w-md";
      case "md":
        return "lg:w-1/2 md:w-[82%] w-[95%] max-w-2xl"; // Fixed: was md:[80%]
      case "lg":
        return "lg:w-2/3 md:w-[85%] w-[95%] max-w-4xl";
      case "xl":
        return "lg:w-4/5 md:w-[90%] w-[95%] max-w-6xl";
      case "full":
        return "w-[95%] max-w-7xl";
      default:
        return "lg:w-1/2 md:w-[80%] w-[95%] max-w-2xl"; // Default to 'md' size
    }
  };

  return createPortal(
    <div className="fixed inset-0 modal z-[99] flex items-center justify-center p-3 bg-black bg-opacity-50">
      <div
        ref={closeOnOutsideClick ? modalRef : null}
        className={`bg-background  dark:bg-dark-foreground  dark:border dark:border-gray-700 dark:text-slate-300 rounded-[4px] shadow-lg ${getModalSizeClasses(
          size
        )}  py-4 pl-4  animate-slideDown`}
      >
        {title && !hideCloseButton && (
          <div className="flex justify-between mb-4 mr-4">
            <h2 className="text-[15px] font-semibold text-black  dark:text-slate-200">
              {title}
            </h2>
            {!hideCloseButton && (
              <div
                onClick={handleModalClose}
                className="cursor-pointer  p-1 rounded-sm  hover:bg-gray-200 dark:hover:bg-dark-light"
              >
                <LuX color="red" />
              </div>
            )}
          </div>
        )}

        <form
          onSubmit={(e) => {
            onSubmit?.(e);
            e?.preventDefault();
          }}
        >
          <div className="max-h-[80vh] overflow-y-auto pl-1 pr-3 pb-2">
            {children}
          </div>
          {showFooter && (
            <div className="mt-4 gap-2 flex justify-end pr-4">
              {footerButton && (
                <CancelButton
                  className={`${type === "DELETE"
                    ? "bg-white dark:bg-transparent border-primary text-primary hover:bg-transparent  hover:text-primary dark:text-slate-400 dark:border-slate-400 "
                    : ""
                    }`}
                  onClick={handleModalClose}
                />
              )}
              {footerButton}
            </div>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
