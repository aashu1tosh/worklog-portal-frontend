import { FormError, FormLabel } from "@/components/ui/form";
import * as React from "react";
import type { FieldError } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?:
    | "text"
    | "password"
    | "search"
    | "date"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "file"
    | "datetime-local"
    | "time";
  icon?: React.ReactNode;
  error?: FieldError | undefined;
  label?: string;
  required?: boolean;
  helperText?: string;
  readonly?: boolean;
}

const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    (
      { className, label, required, icon, error, type, readOnly, ...props },
      ref
    ) => {
      const containerClassNames = React.useMemo(() => {
        const baseClasses =
          "flex rounded-[4px] w-full border-[1px] bg-background dark:bg-[#02040A] dark:border-gray-600 dark:text-slate-300 px-3 h-[32px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
        const errorClass = error
          ? "border-red-500"
          : "border-gray-300 active:border-gray-400 focus:border-gray-400 hover:border-gray-400";
        return `${baseClasses} ${errorClass} ${className}`;
      }, [error, className]);

      const [show, setShow] = React.useState(false);

      return (
        <div>
          {label ? (
            <FormLabel required={required} readOnly={readOnly}>
              {label}
            </FormLabel>
          ) : (
            ""
          )}

          <div
            className={containerClassNames}
            style={{
              paddingLeft: type === "file" ? "2px" : "auto",
            }}
          >
            {icon && (
              <div className="flex items-center mr-2 text-primary-500">
                {icon}
              </div>
            )}

            <input
              type={
                type === "password"
                  ? show
                    ? "text"
                    : "password"
                  : type ?? "text"
              }
              className="w-full x active:border-none focus:outline-none active:outline-none bg-transparent placeholder:text-[12px] placeholder:text-gray-400"
              ref={ref}
              style={{
                paddingTop: type === "file" ? "3px" : "0",
              }}
              {...props}
            />
            <div
              onClick={() => {
                setShow((prev) => !prev);
              }}
              style={{
                display: type === "password" ? "flex" : "none",
              }}
              className="items-center h-[32px] cursor-pointer"
            >
              {show ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <FormError error={error?.message} />
          {props.helperText ? <small>{props.helperText}</small> : ""}
        </div>
      );
    }
  )
);

export { Input };
