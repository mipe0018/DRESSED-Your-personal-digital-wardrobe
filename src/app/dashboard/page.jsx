
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
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const closetCategories = [
  { name: "Tops", count: 0, icon: Shirt },
  { name: "Shoes", count: 0, icon: Footprints },
  { name: "Bags", count: 0, icon: ShoppingBag },
  { name: "Accessories", count: 0, icon: Glasses },
];

const quickStats = [
  { label: "Closet items", value: "0", icon: Shirt, color: "bg-dressed-pink-soft" },
  { label: "My looks", value: "0", icon: Heart, color: "bg-dressed-lilac" },
  { label: "Favorites", value: "0", icon: Star, color: "bg-[#F5E9D5]" },
  { label: "Style ideas", value: "0", icon: WandSparkles, color: "bg-[#F4DDE0]" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-dressed-pink-light text-dressed-text">
      <AppNavigation />

      <div className="page-container py-8 sm:py-12">

        {/* WELCOME */}
        <section className="relative overflow-hidden rounded-[30px] border border-dressed-border bg-white p-6 shadow-[0_12px_40px_rgba(130,70,100,0.08)] sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-dressed-pink-soft blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <Badge variant="pink" className="gap-2 px-3 py-2 text-[10px] tracking-[0.15em]">
                <Sparkles size={13} />
                YOUR PERSONAL FASHION SPACE
              </Badge>

              <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                Welcome back!
                <span className="block italic text-dressed-pink-strong">
                  What's the outfit situation?
                </span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-dressed-muted">
                Your closet is waiting. Organize your pieces,
                create new combinations and find your next favorite look.
              </p>

              <Link
                href="/style-studio"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-dressed-pink-strong px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-dressed-pink-dark"
              >
                Plan an outfit
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="relative mx-auto flex h-48 w-48 shrink-0 items-center justify-center rounded-full bg-dressed-pink-light md:mr-8">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-dressed-pink-strong/40 bg-white">
                <Sparkles size={58} strokeWidth={1} className="text-dressed-pink-strong" />
              </div>

              <Star className="absolute right-1 top-4 rotate-12 text-dressed-pink-strong" size={27} />
              <Heart className="absolute bottom-5 left-2 fill-dressed-pink text-dressed-pink" size={23} />

              <span className="absolute -bottom-1 right-0 rotate-6 rounded-xl bg-dressed-lilac px-3 py-2 text-[10px] font-bold text-dressed-lilac-dark">
                YOUR STYLE!
              </span>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}
        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.label}
                className="transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.color}`}>
                    <Icon size={19} className="text-dressed-muted" />
                  </div>

                  <Sparkles size={15} className="text-dressed-pink-strong" />
                </div>

                <p className="mt-5 font-serif text-3xl">{stat.value}</p>

                <p className="mt-1 text-xs font-semibold text-dressed-muted">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </section>

        {/* CLOSET OVERVIEW */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-dressed-pink-dark">
                THE CLOSET EDIT
              </p>

              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                My wardrobe.
              </h2>

              <p className="mt-2 text-sm text-dressed-muted">
                Everything in its place. Totally organized.
              </p>
            </div>

            <Link
              href="/wardrobe"
              className="inline-flex items-center gap-2 text-xs font-bold text-dressed-pink-dark transition hover:gap-3"
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
                  className="group"
                >
                  <Card className="transition hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dressed-pink-light text-dressed-pink-dark transition group-hover:rotate-6">
                        <Icon size={24} />
                      </div>

                      <ArrowRight size={16} className="text-dressed-muted" />
                    </div>

                    <h3 className="mt-6 font-serif text-xl">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-dressed-muted">
                      {category.count} pieces
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* STYLE STUDIO */}
        <section className="mt-12 grid gap-5 md:grid-cols-2">

          <div className="relative overflow-hidden rounded-[28px] bg-dressed-lilac p-7 sm:p-9">
            <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-white/40 blur-2xl" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-dressed-lilac-dark">
                <WandSparkles size={24} />
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-dressed-lilac-dark">
                YOUR PERSONAL STYLING ROOM
              </p>

              <h2 className="mt-3 max-w-sm font-serif text-3xl">
                What to wear?
                <span className="block italic">Let's find out.</span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-dressed-lilac-dark">
                Mix your wardrobe pieces and create a look
                that's totally you.
              </p>

              <Link
                href="/style-studio"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-dressed-lilac-dark transition hover:-translate-y-0.5"
              >
                Enter Style Studio <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-dressed-pink-soft p-7 sm:p-9">
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/50 blur-2xl" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-dressed-pink-dark">
                <Heart size={24} />
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-dressed-pink-dark">
                THE LOOKBOOK
              </p>

              <h2 className="mt-3 max-w-sm font-serif text-3xl">
                Your looks.
                <span className="block italic">Your collection.</span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-dressed-muted">
                Keep your favorite outfit combinations
                together and never lose a good look.
              </p>

              <Link
                href="/outfits"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-dressed-pink-dark transition hover:-translate-y-0.5"
              >
                View my looks <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ADD CLOTHES */}
        <section className="mt-12 rounded-[28px] border border-dashed border-dressed-pink-medium bg-white/70 p-7 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-dressed-pink-light text-dressed-pink-dark">
            <Plus size={27} />
          </div>

          <h2 className="mt-5 font-serif text-2xl sm:text-3xl">
            A little closet refresh?
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-dressed-muted">
            Add your clothes, shoes and accessories
            and give your digital wardrobe a little update.
          </p>

          <Link
            href="/wardrobe"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-dressed-pink-medium bg-white px-5 py-3 text-xs font-bold text-dressed-pink-dark transition hover:bg-dressed-pink-light"
          >
            <Plus size={15} />
            Add to my closet
          </Link>
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-10 flex items-center justify-center gap-2 pb-5 text-[10px] font-semibold tracking-[0.15em] text-dressed-muted">
          <Heart size={12} className="fill-dressed-pink text-dressed-pink" />
          YOUR STYLE. YOUR RULES. DRESSED.
          <Heart size={12} className="fill-dressed-pink text-dressed-pink" />
        </div>
      </div>
    </main>
  );
}
