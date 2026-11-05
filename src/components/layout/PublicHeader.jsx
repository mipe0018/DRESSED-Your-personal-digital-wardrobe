
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-20 border-b border-[#F2D6E3] bg-[#FFF0F6]">
      <div className="page-container flex min-h-[78px] items-center justify-between gap-4">

        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex flex-col leading-none"
        >
          <span className="font-serif text-3xl font-bold tracking-tight text-[#392D35]">
            DRESSED<span className="text-[#ED4F8E]">.</span>
          </span>

          <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[#A17D8D]">
            YOUR DIGITAL WARDROBE
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="/#features" className="transition hover:text-[#D93676]">
            Discover
          </a>

          <a href="/#how-it-works" className="transition hover:text-[#D93676]">
            How it works
          </a>

          <a href="/#pricing" className="transition hover:text-[#D93676]">
            Pricing
          </a>
        </nav>

        {/* DESKTOP ACCOUNT LINKS */}
        <div className="hidden items-center gap-4 sm:flex">
          <Link
            href="/login"
            className="px-2 py-2 text-sm font-semibold transition hover:text-[#D93676]"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#ED4F8E] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#D93676]"
          >
            Join DRESSED
            <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#D93676] transition hover:bg-[#F8DCE8] sm:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-[#F2D6E3] bg-[#FFF0F6] px-5 pb-6 pt-3 shadow-lg sm:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="/#features"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#D93676]"
            >
              Discover
            </a>

            <a
              href="/#how-it-works"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#D93676]"
            >
              How it works
            </a>

            <a
              href="/#pricing"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#D93676]"
            >
              Pricing
            </a>

            <div className="my-2 border-t border-[#F2D6E3]" />

            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={closeMenu}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[#ED4F8E] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D93676]"
            >
              Join DRESSED
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
