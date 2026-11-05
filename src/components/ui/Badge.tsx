
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "pink" | "neutral" | "success" | "warning";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

export default function Badge({
  children,
  variant = "pink",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-dressed-pink-light text-dressed-pink-dark":
            variant === "pink",
          "bg-gray-100 text-gray-700": variant === "neutral",
          "bg-green-100 text-green-700": variant === "success",
          "bg-amber-100 text-amber-700": variant === "warning",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
