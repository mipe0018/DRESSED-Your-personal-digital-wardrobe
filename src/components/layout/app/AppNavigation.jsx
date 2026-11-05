
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  WandSparkles,
  Heart,
  UserRound,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

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

function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-dressed-border bg-dressed-pink-light/95 backdrop-blur-md">
      {/* TOP NAVIGATION */}
      <div className="page-container flex min-h-[82px] items-center justify-between gap-4">

        {/* LOGO */}
        <Link
          href="/dashboard"
          className="flex shrink-0 flex-col leading-none"
          aria-label="DRESSED – Go to dashboard"
        >
          <span className="font-serif text-3xl font-bold tracking-tight text-dressed-text">
            DRESSED<span className="text-dressed-pink-strong">.</span>
          </span>

          <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-dressed-muted">
            YOUR DIGITAL WARDROBE
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-dressed-pink-soft text-dressed-pink-dark shadow-sm"
                    : "text-dressed-muted hover:bg-white hover:text-dressed-pink-dark"
                }`}
              >
                <Icon size={16} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE SHORTCUT */}
        <div className="hidden items-center gap-3 lg:flex">
          <span className="h-7 w-px bg-dressed-border" />

          <Link
            href="/profile"
            aria-current={pathname === "/profile" ? "page" : undefined}
            className="flex items-center gap-2 rounded-full border border-dressed-border bg-white px-3 py-2 transition hover:border-dressed-pink-strong"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dressed-pink-soft text-dressed-pink-dark">
              <UserRound size={15} />
            </span>

            <span className="text-xs font-semibold text-dressed-text">
              My account
            </span>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-dressed-pink-dark shadow-sm transition hover:bg-dressed-pink-soft lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-dressed-border bg-white px-5 py-4 shadow-lg lg:hidden"
        >
          <div className="mb-3 flex items-center gap-2 px-3">
            <Sparkles size={15} className="text-dressed-pink-strong" />

            <span className="text-[10px] font-bold tracking-[0.18em] text-dressed-muted">
              YOUR FASHION SPACE
            </span>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-dressed-pink-soft text-dressed-pink-dark"
                      : "text-dressed-muted hover:bg-dressed-pink-light"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}

            <div className="my-2 border-t border-dressed-border" />

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-dressed-muted transition hover:bg-dressed-pink-light"
            >
              <UserRound size={18} />
              My account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
