
import Link from "next/link";
import { UserRound, Heart, Shirt, Settings } from "lucide-react";

import AppNavigation from "@/components/layout/app/AppNavigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-dressed-pink-light text-dressed-text">
      <AppNavigation />

      <div className="page-container py-10">
        <Badge variant="pink">YOUR PERSONAL SPACE</Badge>

        <h1 className="mt-4 font-serif text-4xl">My Profile.</h1>
        <p className="mt-2 text-sm text-dressed-muted">
          Your account and personal style preferences.
        </p>

        <Card className="mt-8">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-dressed-pink-soft text-dressed-pink-dark">
              <UserRound size={36} />
            </div>

            <div>
              <h2 className="font-serif text-2xl">Your profile</h2>
              <p className="mt-1 text-sm text-dressed-muted">
                Your personal details will appear here.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link href="/wardrobe">
            <Card className="flex items-center gap-4 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dressed-pink-light text-dressed-pink-dark">
                <Shirt size={23} />
              </div>
              <div>
                <h3 className="font-semibold">My Closet</h3>
                <p className="mt-1 text-xs text-dressed-muted">
                  View your wardrobe
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/outfits">
            <Card className="flex items-center gap-4 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dressed-lilac text-dressed-lilac-dark">
                <Heart size={23} />
              </div>
              <div>
                <h3 className="font-semibold">My Looks</h3>
                <p className="mt-1 text-xs text-dressed-muted">
                  View your saved outfits
                </p>
              </div>
            </Card>
          </Link>
        </div>

        <Card className="mt-6">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-dressed-muted" />
            <div>
              <h3 className="font-semibold">Account settings</h3>
              <p className="mt-1 text-xs text-dressed-muted">
                Profile settings and preferences will be available here.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
