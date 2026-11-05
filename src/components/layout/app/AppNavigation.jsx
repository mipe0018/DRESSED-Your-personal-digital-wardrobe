
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  WandSparkles,
  Heart,
  UserRound,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navigationItems = [
  {
    label: "My World",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Closet",
    href: "/wardrobe",
    icon: Shirt,
  },
  {
    label: "Outfit Planner",
    href: "/style-studio",
    icon: WandSparkles,
  },
  {
    label: "My Looks",
    href: "/outfits",
    icon: Heart,
  },
  {
    label: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
];

export default function AppNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#EFCFDE] bg-[#FFF0F6]/95 backdrop-blur-md">

      {/* TOP NAVIGATION */}
      <div className="page-container flex min-h-[82px] items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/dashboard" className="flex shrink-0 flex-col leading-none">
          <span className="font-serif text-3xl font-bold tracking-tight text-[#392D35]">
            DRESSED<span className="text-[#ED4F8E]">.</span>
          </span>

          <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[#A17D8D]">
            YOUR DIGITAL WARDROBE
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#F8DCE8] text-[#D93676] shadow-sm"
                    : "text-[#806C75] hover:bg-white hover:text-[#D93676]"
                )}
              >
                <Icon size={16} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE SHORTCUT */}
        <div className="hidden items-center gap-3 lg:flex">
          <span className="h-7 w-px bg-[#EFCFDE]" />

          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-[#F2D6E3] bg-white px-3 py-2 transition hover:border-[#ED4F8E]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8DCE8] text-[#D93676]">
              <UserRound size={15} />
            </span>

            <span className="text-xs font-semibold text-[#392D35]">
              My account
            </span>

            <ChevronDown size={13} className="text-[#A17D8D]" />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#D93676] shadow-sm transition hover:bg-[#F8DCE8] lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="border-t border-[#F2D6E3] bg-[#FFFAFC] px-5 py-4 shadow-lg lg:hidden">
          <div className="mb-3 flex items-center gap-2 px-3">
            <Sparkles size={15} className="text-[#ED4F8E]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#A17D8D]">
              YOUR FASHION SPACE
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-[#F8DCE8] text-[#D93676]"
                      : "text-[#806C75] hover:bg-[#FFF0F6]"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
