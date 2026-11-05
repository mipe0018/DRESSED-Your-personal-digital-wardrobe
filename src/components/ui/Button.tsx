import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant = "primary",
  children,
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-dressed-pink-strong text-white shadow-sm hover:bg-dressed-pink-dark":
            variant === "primary",

          "bg-dressed-pink-soft text-dressed-text hover:bg-dressed-pink-medium":
            variant === "secondary",

          "border border-dressed-border bg-white text-dressed-text hover:border-dressed-pink":
            variant === "outline",

          "bg-transparent text-dressed-text hover:bg-dressed-pink-light":
            variant === "ghost",
        },
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}