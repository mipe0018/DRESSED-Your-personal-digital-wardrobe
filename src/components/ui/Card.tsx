
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: "small" | "medium" | "large";
};

export default function Card({
  children,
  padding = "medium",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-dressed-border bg-white shadow-sm",
        {
          "p-3": padding === "small",
          "p-5": padding === "medium",
          "p-7": padding === "large",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
