import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#111827]">
            {label}
            {props.required && <span className="text-[#D4B996] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-white border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#6B7280]/60 resize-none",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]",
            "hover:border-[#D4B996]/60",
            error && "border-red-300 focus:ring-red-200",
            className
          )}
          rows={4}
          {...props}
        />
        {hint && !error && <p className="text-xs text-[#6B7280]">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
