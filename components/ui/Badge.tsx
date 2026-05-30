import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "gold" | "blue";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  default: "bg-[#EFE7DE] text-[#6B7280]",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  gold: "bg-[#D4B996]/20 text-[#B8966A] border border-[#D4B996]/40",
  blue: "bg-[#6C8EBF]/10 text-[#6C8EBF] border border-[#6C8EBF]/30",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ variant = "default", size = "md", children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-medium rounded-full", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
