import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#111827]">
            {label}
            {props.required && <span className="text-[#D4B996] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-white border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#6B7280]/60",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]",
              "hover:border-[#D4B996]/60",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#FAF8F5]",
              error && "border-red-300 focus:ring-red-200 focus:border-red-400",
              leftIcon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {hint && !error && <p className="text-xs text-[#6B7280]">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
