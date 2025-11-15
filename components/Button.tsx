import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-400 active:bg-cyan-600 shadow-md hover:shadow-lg",
    secondary: "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 hover:bg-slate-300 dark:hover:bg-white/15 active:bg-slate-100 dark:active:bg-white/5"
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
