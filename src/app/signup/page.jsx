
import Link from "next/link";
import { UserRoundPlus, Mail, LockKeyhole } from "lucide-react";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthBrandPanel from "@/components/layout/AuthBrandPanel";
import AuthBackLink from "@/components/layout/AuthBackLink";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  return (
    <>
      <AuthBackLink />

      <AuthLayout
        brandPanel={
          <AuthBrandPanel
            label="A LITTLE MORE YOU"
            title="Your closet. Your rules."
            description="Create your own digital wardrobe, save your favourite looks and make getting dressed a little more fun."
            windowTitle="YOUR NEW CLOSET"
          />
        }
      >
        <div className="mb-8">
          <span className="text-[10px] font-bold tracking-[0.22em] text-dressed-pink-strong">
            JOIN DRESSED
          </span>

          <h2 className="mt-3 font-serif text-4xl text-dressed-text">
            Create your account.
          </h2>

          <p className="mt-3 text-sm leading-6 text-dressed-muted">
            Your digital wardrobe starts here.
          </p>
        </div>

        <form className="space-y-4">
          <Input
            label="Your name"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="What should we call you?"
          />

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold text-dressed-text"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-dressed-muted"
              />

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="pl-11"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-bold text-dressed-text"
            >
              Create password
            </label>

            <div className="relative">
              <LockKeyhole
                size={16}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-dressed-muted"
              />

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Choose a password"
                className="pl-11"
              />
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            fullWidth
            className="mt-3 rounded-full py-4 shadow-lg shadow-dressed-pink/20 hover:-translate-y-0.5"
          >
            <UserRoundPlus size={17} />
            Create my account
          </Button>
        </form>

        <div className="my-7 flex items-center gap-4">
          <span className="h-px flex-1 bg-dressed-border" />

          <span className="text-[10px] font-semibold tracking-wider text-dressed-muted">
            ALREADY A MEMBER?
          </span>

          <span className="h-px flex-1 bg-dressed-border" />
        </div>

        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-full border border-dressed-pink-strong bg-white px-6 py-3.5 text-sm font-bold text-dressed-pink-dark transition hover:bg-dressed-pink-light"
        >
          Log in instead
        </Link>

        <p className="mt-7 text-center text-[10px] leading-5 text-dressed-muted">
          A wardrobe full of possibilities.
          <br />
          Let's get started.
        </p>
      </AuthLayout>
    </>
  );
}
