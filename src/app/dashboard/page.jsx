
import Link from "next/link";
import {
  Shirt,
  Heart,
  Sparkles,
  WandSparkles,
  ArrowRight,
  Plus,
  Star,
  ShoppingBag,
  Footprints,
  Glasses,
} from "lucide-react";

import AppNavigation from "@/components/layout/app/AppNavigation";

const closetCategories = [
  { name: "Tops", count: 0, icon: Shirt },
  { name: "Shoes", count: 0, icon: Footprints },
  { name: "Bags", count: 0, icon: ShoppingBag },
  { name: "Accessories", count: 0, icon: Glasses },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF0F6] text-[#392D35]">
      <AppNavigation />

      <div className="page-container py-8 sm:py-12">

        {/* WELCOME */}
        <section className="relative overflow-hidden rounded-[30px] border border-[#F2D6E3] bg-white p-6 shadow-[0_12px_40px_rgba(130,70,100,0.08)] sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[#F8DCE8] blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FCE4ED] px-3 py-2 text-[10px] font-bold tracking-[0.15em] text-[#D93676]">
                <Sparkles size={13} />
                YOUR PERSONAL FASHION SPACE
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                Welcome back!
                <span className="block italic text-[#ED4F8E]">
                  What's the outfit situation?
                </span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#806C75]">
                Your closet is waiting. Organize your pieces,
                create new combinations and find your next favorite look.
              </p>

              <Link
                href="/style-studio"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ED4F8E] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#D93676]"
              >
                Plan an outfit
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="relative mx-auto flex h-48 w-48 shrink-0 items-center justify-center rounded-full bg-[#FFF0F6] md:mr-8">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-[#ED4F8E]/40 bg-white">
                <Sparkles size={58} strokeWidth={1} className="text-[#ED4F8E]" />
              </div>
              <Star className="absolute right-1 top-4 rotate-12 text-[#ED4F8E]" size={27} />
              <Heart className="absolute bottom-5 left-2 fill-[#F77EAE] text-[#F77EAE]" size={23} />
              <span className="absolute -bottom-1 right-0 rotate-6 rounded-xl bg-[#E9DDF0] px-3 py-2 text-[10px] font-bold text-[#695675]">
                YOUR STYLE!
              </span>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}
        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Closet items", value: "0", icon: Shirt, color: "#F8DCE8" },
            { label: "My looks", value: "0", icon: Heart, color: "#E9DDF0" },
            { label: "Favorites", value: "0", icon: Star, color: "#F5E9D5" },
            { label: "Style ideas", value: "0", icon: WandSparkles, color: "#F4DDE0" },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-[22px] border border-[#F2DCE6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: stat.color }}
                  >
                    <Icon size={19} className="text-[#806C75]" />
                  </div>
                  <Sparkles size={15} className="text-[#ED4F8E]" />
                </div>

                <p className="mt-5 font-serif text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-[#A17D8D]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </section>

        {/* CLOSET OVERVIEW */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D93676]">
                THE CLOSET EDIT
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                My wardrobe.
              </h2>
              <p className="mt-2 text-sm text-[#806C75]">
                Everything in its place. Totally organized.
              </p>
            </div>

            <Link
              href="/wardrobe"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D93676] transition hover:gap-3"
            >
              Open my closet <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {closetCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  href="/wardrobe"
                  key={category.name}
                  className="group rounded-[24px] border border-[#F2DCE6] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE4ED] text-[#D93676] transition group-hover:rotate-6">
                      <Icon size={24} />
                    </div>
                    <ArrowRight size={16} className="text-[#C7A5B5]" />
                  </div>

                  <h3 className="mt-6 font-serif text-xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#A17D8D]">
                    {category.count} pieces
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* STYLE STUDIO */}
        <section className="mt-12 grid gap-5 md:grid-cols-2">

          <div className="relative overflow-hidden rounded-[28px] bg-[#E9DDF0] p-7 sm:p-9">
            <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-white/40 blur-2xl" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#695675]">
                <WandSparkles size={24} />
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-[#695675]">
                YOUR PERSONAL STYLING ROOM
              </p>

              <h2 className="mt-3 max-w-sm font-serif text-3xl">
                What to wear?
                <span className="block italic">Let's find out.</span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#695675]">
                Mix your wardrobe pieces and create a look
                that's totally you.
              </p>

              <Link
                href="/style-studio"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#695675] transition hover:-translate-y-0.5"
              >
                Enter Style Studio <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#F8DCE8] p-7 sm:p-9">
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/50 blur-2xl" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#D93676]">
                <Heart size={24} />
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-[#D93676]">
                THE LOOKBOOK
              </p>

              <h2 className="mt-3 max-w-sm font-serif text-3xl">
                Your looks.
                <span className="block italic">Your collection.</span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#806C75]">
                Keep your favorite outfit combinations
                together and never lose a good look.
              </p>

              <Link
                href="/outfits"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#D93676] transition hover:-translate-y-0.5"
              >
                View my looks <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ADD CLOTHES */}
        <section className="mt-12 rounded-[28px] border border-dashed border-[#E9B9CE] bg-white/70 p-7 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FCE4ED] text-[#D93676]">
            <Plus size={27} />
          </div>

          <h2 className="mt-5 font-serif text-2xl sm:text-3xl">
            A little closet refresh?
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#806C75]">
            Add your clothes, shoes and accessories
            and give your digital wardrobe a little update.
          </p>

          <Link
            href="/wardrobe"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E9B9CE] bg-white px-5 py-3 text-xs font-bold text-[#D93676] transition hover:bg-[#FFF0F6]"
          >
            <Plus size={15} />
            Add to my closet
          </Link>
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-10 flex items-center justify-center gap-2 pb-5 text-[10px] font-semibold tracking-[0.15em] text-[#B18B9B]">
          <Heart size={12} className="fill-[#F77EAE] text-[#F77EAE]" />
          YOUR STYLE. YOUR RULES. DRESSED.
          <Heart size={12} className="fill-[#F77EAE] text-[#F77EAE]" />
        </div>
      </div>
    </main>
  );
}
