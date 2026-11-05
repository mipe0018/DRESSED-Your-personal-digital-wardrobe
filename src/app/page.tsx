
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Shirt,
  ShoppingBag,
  Glasses,
  Footprints,
  Star,
  WandSparkles,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const wardrobeItems = [
  {
    name: "Cute top",
    category: "TOPS",
    icon: Shirt,
    color: "bg-[#F8DCE8]",
    rotation: "-3deg",
  },
  {
    name: "Everyday bag",
    category: "BAGS",
    icon: ShoppingBag,
    color: "bg-[#E9DDF0]",
    rotation: "3deg",
  },
  {
    name: "Your favorite shades",
    category: "ACCESSORIES",
    icon: Glasses,
    color: "bg-[#F5E9D5]",
    rotation: "-2deg",
  },
  {
    name: "Dream shoes",
    category: "SHOES",
    icon: Footprints,
    color: "bg-[#F4DDE0]",
    rotation: "2deg",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Your personal AI model",
    description:
      "Create your own digital fashion model and see your outfits come to life.",
  },
  {
    icon: Shirt,
    title: "Your digital wardrobe",
    description:
      "Keep all your clothes, shoes and accessories together in one personal closet.",
  },
  {
    icon: WandSparkles,
    title: "Create your outfits",
    description:
      "Mix, match and experiment with your wardrobe to discover new looks.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF0F6] text-[#392D35]">

      {/* PUBLIC HEADER */}
      <header className="relative z-20 border-b border-[#F2D6E3] bg-[#FFF0F6]">
        <div className="page-container flex min-h-[78px] items-center justify-between gap-4">

          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#392D35]">
              DRESSED<span className="text-[#ED4F8E]">.</span>
            </span>
            <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[#A17D8D]">
              YOUR DIGITAL WARDROBE
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#features" className="transition hover:text-[#D93676]">
              Discover
            </a>
            <a href="#how-it-works" className="transition hover:text-[#D93676]">
              How it works
            </a>
            <a href="#pricing" className="transition hover:text-[#D93676]">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="px-2 py-2 text-sm font-semibold transition hover:text-[#D93676]"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-full bg-[#ED4F8E] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#D93676] sm:px-5 sm:text-sm"
            >
              Join DRESSED <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#FFD7E7] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#E9DDF0] blur-3xl" />

        <div className="page-container relative grid items-center gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">

          {/* HERO TEXT */}
          <div className="relative z-10">
            <Badge>THE NEW WAY TO LOVE YOUR CLOSET</Badge>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Your closet.
              <br />
              Your rules.
              <span className="mt-2 block italic text-[#ED4F8E]">
                Your world.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#806C75]">
              Welcome to your own little fashion universe.
              Organize your wardrobe, create new outfits and
              explore your personal style with DRESSED.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup">
                <Button>
                  Create your closet <ArrowRight size={17} />
                </Button>
              </Link>

              <a
                href="#features"
                className="rounded-full border border-[#E9C9D8] px-5 py-3 text-sm font-semibold transition hover:bg-white"
              >
                Discover DRESSED
              </a>
            </div>

            <div className="mt-9 flex items-center gap-2 text-xs font-medium text-[#A17D8D]">
              <Heart size={15} className="fill-[#ED4F8E] text-[#ED4F8E]" />
              <span>Made for your style. Made for you.</span>
            </div>

            <Star
              className="absolute -right-4 top-4 hidden rotate-12 text-[#ED4F8E] sm:block"
              size={30}
            />
          </div>

          {/* WARDROBE PREVIEW */}
          <div className="relative mx-auto w-full max-w-[570px]">

            <div className="absolute -right-5 -top-7 z-10 rotate-6 rounded-2xl bg-white px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D93676]">
                <Heart size={15} className="fill-[#F77EAE]" />
                YOUR STYLE, YOUR WAY
              </div>
            </div>

            <div className="relative rounded-[30px] border border-white/80 bg-white/80 p-3 shadow-[0_20px_60px_rgba(130,70,100,0.13)] backdrop-blur-sm sm:p-5">

              {/* WINDOW TOP BAR */}
              <div className="flex items-center justify-between rounded-t-[22px] bg-[#F8DCE8] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#F77EAE]" />
                  <span className="h-3 w-3 rounded-full bg-[#F7D28B]" />
                  <span className="h-3 w-3 rounded-full bg-[#A8D8B9]" />
                </div>

                <span className="text-[10px] font-bold tracking-[0.2em] text-[#806C75]">
                  MY DIGITAL CLOSET
                </span>

                <Heart size={15} className="text-[#D93676]" />
              </div>

              <div className="rounded-b-[22px] bg-[#FFFAFC] p-4 sm:p-6">

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#B18B9B]">
                      YOUR PERSONAL SPACE
                    </p>
                    <h2 className="mt-1 font-serif text-2xl sm:text-3xl">
                      The wardrobe edit.
                    </h2>
                  </div>

                  <div className="rounded-full bg-[#FCE4ED] p-3 text-[#D93676]">
                    <Sparkles size={21} />
                  </div>
                </div>

                {/* CATEGORY PILLS */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Everything", "Clothing", "Shoes", "Bags"].map(
                    (category, index) => (
                      <span
                        key={category}
                        className={`rounded-full px-3 py-2 text-[10px] font-semibold ${
                          index === 0
                            ? "bg-[#ED4F8E] text-white"
                            : "bg-[#F8EAF0] text-[#806C75]"
                        }`}
                      >
                        {category}
                      </span>
                    )
                  )}
                </div>

                {/* WARDROBE ITEMS */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {wardrobeItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.name}
                        className="group overflow-hidden rounded-[20px] border border-[#F2E2E9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-md"
                      >
                        <div
                          className={`relative flex aspect-[4/3] items-center justify-center ${item.color}`}
                        >
                          <Icon
                            size={53}
                            strokeWidth={1.2}
                            className="text-[#806C75] transition duration-300 group-hover:scale-110"
                            style={{ transform: `rotate(${item.rotation})` }}
                          />
                          <Heart
                            size={15}
                            className="absolute right-3 top-3 text-[#D93676]"
                          />
                        </div>

                        <div className="p-3">
                          <p className="text-[9px] font-semibold tracking-[0.15em] text-[#B18B9B]">
                            {item.category}
                          </p>
                          <p className="mt-1 text-xs font-semibold">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#F8EAF0] p-3">
                  <div>
                    <p className="text-xs font-bold">A closet full of possibilities.</p>
                    <p className="mt-1 text-[10px] text-[#806C75]">
                      Your personal fashion universe.
                    </p>
                  </div>
                  <Sparkles size={19} className="text-[#D93676]" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 rotate-[-5deg] rounded-2xl bg-[#E9DDF0] px-4 py-3 shadow-md">
              <span className="text-xs font-bold text-[#695675]">
                ✦ OUTFIT INSPO ✦
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative bg-white py-20">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center">
            <Badge>MEET YOUR NEW FAVORITE SPACE</Badge>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              It's giving main character.
            </h2>
            <p className="mt-4 leading-7 text-[#806C75]">
              Your wardrobe deserves more than a forgotten corner
              of your room. Give your style a space of its own.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group rounded-[26px] border-[#F2DCE6] bg-[#FFFAFC] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-[#ED4F8E]">
                      0{index + 1}
                    </span>
                    <div className="rounded-2xl bg-[#FCE4ED] p-3 text-[#D93676] transition group-hover:rotate-6">
                      <Icon size={23} />
                    </div>
                  </div>

                  <h3 className="mt-8 font-serif text-2xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#806C75]">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="page-container py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Badge>HOW IT WORKS</Badge>
            <h2 className="mt-5 max-w-md font-serif text-4xl sm:text-5xl">
              Your fashion world starts here.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[#806C75]">
              Build your personal wardrobe, explore your style
              and create outfits that feel like you.
            </p>
          </div>

          <div className="space-y-7">
            {[
              ["01", "Create your account", "Get your own personal DRESSED space."],
              ["02", "Build your wardrobe", "Add your clothes, shoes and accessories."],
              ["03", "Create your looks", "Experiment and find new outfit combinations."],
            ].map(([number, title, description]) => (
              <div key={number} className="flex gap-5">
                <span className="font-serif text-3xl italic text-[#ED4F8E]">
                  {number}
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#806C75]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#F8DCE8] py-20">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center">
            <Badge>NO MONTHLY SUBSCRIPTION</Badge>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              Your closet. Your way.
            </h2>
            <p className="mt-4 leading-7 text-[#806C75]">
              One-time access to your personal fashion space.
              Extra AI tokens can be purchased whenever you need them.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-lg rounded-[30px] border border-white bg-white p-7 shadow-[0_15px_50px_rgba(130,70,100,0.10)] sm:p-9">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-[#D93676]">
                  DRESSED ACCESS
                </p>
                <h3 className="mt-2 font-serif text-3xl">
                  Your own fashion universe.
                </h3>
              </div>
              <div className="rounded-full bg-[#FFF0F6] p-3 text-[#D93676]">
                <Heart size={23} />
              </div>
            </div>

            <div className="my-7 space-y-4">
              {[
                "Your personal account",
                "Your own AI fashion model",
                "Included starter generations",
                "Your digital wardrobe",
                "Outfit creation tools",
                "Optional extra token purchases",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FCE4ED] text-[#D93676]">
                    <Star size={11} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <Link href="/signup" className="block">
              <Button fullWidth>
                Create your DRESSED account <ArrowRight size={17} />
              </Button>
            </Link>

            <p className="mt-4 text-center text-xs text-[#A18B95]">
              One-time access purchase · No recurring subscription
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="page-container py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8DCE8] text-[#D93676]">
            <Heart size={25} className="fill-current" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl">
            Ready to dress up your digital world?
          </h2>

          <p className="mx-auto mt-5 max-w-lg leading-7 text-[#806C75]">
            Your clothes. Your creativity. Your very own DRESSED.
          </p>

          <div className="mt-8">
            <Link href="/signup">
              <Button>
                Join DRESSED <ArrowRight size={17} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#F2D6E3] bg-[#FFF0F6] py-8">
        <div className="page-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-serif text-2xl font-bold">
              DRESSED<span className="text-[#ED4F8E]">.</span>
            </p>
            <p className="mt-1 text-xs text-[#A17D8D]">
              Your digital wardrobe.
            </p>
          </div>

          <div className="flex gap-5 text-xs font-semibold text-[#806C75]">
            <Link href="/login" className="hover:text-[#D93676]">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-[#D93676]">
              Sign up
            </Link>
            <a href="#pricing" className="hover:text-[#D93676]">
              Pricing
            </a>
          </div>

          <p className="text-[10px] text-[#A17D8D]">
            © {new Date().getFullYear()} DRESSED
          </p>
        </div>
      </footer>
    </main>
  );
}
