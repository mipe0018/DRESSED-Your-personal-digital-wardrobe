
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthBrandPanel({
  label = "YOUR STYLE, YOUR RULES",
  title = "Your closet. Your rules.",
  description = "Create your own digital wardrobe, save your favourite looks and make getting dressed a little more fun.",
  windowTitle = "YOUR NEW CLOSET",
}) {
  return (
    <section className="relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-dressed-pink-soft p-9 md:p-12">

      {/* Brand */}
      <div>
        <Link href="/" className="inline-block">
          <span className="font-serif text-4xl font-bold tracking-tight text-dressed-text">
            DRESSED<span className="text-dressed-pink-strong">.</span>
          </span>
        </Link>

        <p className="mt-2 text-[10px] font-bold tracking-[0.25em] text-dressed-muted">
          YOUR DIGITAL WARDROBE
        </p>
      </div>

      {/* Introduction */}
      <div className="relative z-10 my-12">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold text-dressed-pink-dark">
          <Sparkles size={14} />
          {label}
        </span>

        <h1 className="max-w-sm font-serif text-5xl leading-[1.08] text-dressed-text md:text-6xl">
          {title}
        </h1>

        <p className="mt-5 max-w-sm text-sm leading-7 text-dressed-muted">
          {description}
        </p>
      </div>

      {/* Decorative wardrobe window */}
      <div className="relative mx-auto w-full max-w-sm rotate-[-2deg] rounded-2xl border border-white/80 bg-white/80 p-3 shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-dressed-border pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-dressed-pink" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F4C879]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#B9D9C2]" />

          <span className="ml-2 text-[9px] font-bold tracking-[0.18em] text-dressed-muted">
            {windowTitle}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 p-2">
          <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-dressed-pink-light text-4xl">
            👚
          </div>

          <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-dressed-lilac text-4xl">
            👗
          </div>

          <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-[#F8EEDC] text-4xl">
            👜
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[10px] font-semibold tracking-[0.2em] text-dressed-muted">
        YOUR STYLE. YOUR RULES. DRESSED.
      </p>
    </section>
  );
}
