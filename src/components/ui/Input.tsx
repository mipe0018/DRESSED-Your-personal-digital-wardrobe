
import clsx from "clsx";

export default function Input({
  label,
  error,
  id,
  className,
  ...props
}) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-dressed-text"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={clsx(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-dressed-text",
          "placeholder:text-dressed-muted",
          "transition-colors focus:border-dressed-pink-strong focus:outline-none",
          error ? "border-red-400" : "border-dressed-border",
          className
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error && inputId ? `${inputId}-error` : undefined
        }
        {...props}
      />

      {error && (
        <span
          id={inputId ? `${inputId}-error` : undefined}
          className="text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </div>
  );
}
