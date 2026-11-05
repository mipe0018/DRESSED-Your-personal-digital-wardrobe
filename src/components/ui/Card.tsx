
import clsx from "clsx";

export default function Card({
  children,
  padding = "medium",
  className,
  ...props
}) {
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
