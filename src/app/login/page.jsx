
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthBrandPanel from "@/components/layout/AuthBrandPanel";
import AuthBackLink from "@/components/layout/AuthBackLink";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <>
      <AuthBackLink />

      <AuthLayout
        brandPanel={
          <AuthBrandPanel
            label="YOUR STYLE, YOUR RULES"
            title="Back to your closet."
            description="Your wardrobe, your saved looks and all your outfit ideas are waiting right where you left them."
            windowTitle="MY CLOSET"
          />
        }
      >
        <div className="mb-10">
          <span className="text-[10px] font-bold tracking-[0.22em] text-dressed-pink-strong">
            MEMBER LOGIN
          </span>

          <h2 className="mt-3 font-serif text-4xl text-dressed-text">
            Welcome back!
          </h2>

          <p className="mt-3 text-sm leading-6 text-dressed-muted">
            Ready to put an outfit together?
          </p>
        </div>

        <form className="space-y-5">
          <Input
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-dressed-text"
              >
                Password
              </label>

              <span className="text-[11px] text-dressed-muted">
                Forgot password?
              </span>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="button"
            variant="primary"
            fullWidth
            className="rounded-full py-4 shadow-lg shadow-dressed-pink/20 hover:-translate-y-0.5"
          >
            <LockKeyhole size={16} />
            Log in
          </Button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-dressed-border" />

          <span className="text-[10px] font-semibold tracking-wider text-dressed-muted">
            NEW HERE?
          </span>

          <span className="h-px flex-1 bg-dressed-border" />
        </div>

        <Link
          href="/signup"
          className="flex w-full items-center justify-center rounded-full border border-dressed-pink-strong bg-white px-6 py-3.5 text-sm font-bold text-dressed-pink-dark transition hover:bg-dressed-pink-light"
        >
          Create an account
        </Link>

        <p className="mt-8 text-center text-[10px] leading-5 text-dressed-muted">
          Your digital wardrobe, just as you left it.
        </p>
      </AuthLayout>
    </>
  );
}
