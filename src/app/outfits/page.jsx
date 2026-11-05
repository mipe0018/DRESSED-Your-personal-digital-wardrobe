
import Link from "next/link";
import { Heart, Plus, Sparkles } from "lucide-react";

import AppNavigation from "@/components/layout/app/AppNavigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function OutfitsPage() {
  return (
    <main className="min-h-screen bg-dressed-pink-light text-dressed-text">
      <AppNavigation />

      <div className="page-container py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="pink">YOUR PERSONAL LOOKBOOK</Badge>
            <h1 className="mt-4 font-serif text-4xl">My Looks.</h1>
            <p className="mt-2 text-sm text-dressed-muted">
              Your favourite outfit combinations, all together.
            </p>
          </div>

          <Link
            href="/style-studio"
            className="inline-flex items-center gap-2 rounded-full bg-dressed-pink-strong px-5 py-3 text-sm font-bold text-white transition hover:bg-dressed-pink-dark"
          >
            <Plus size={17} />
            Create a look
          </Link>
        </div>

        <Card className="mt-8 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dressed-pink-light text-dressed-pink-dark">
            <Heart size={30} />
          </div>

          <h2 className="mt-5 font-serif text-2xl">Your lookbook starts here.</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-dressed-muted">
            Save your favourite outfit combinations from Style Studio
            and build a collection of looks you love.
          </p>

          <Link
            href="/style-studio"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-dressed-pink-strong px-6 py-3 text-sm font-bold text-white transition hover:bg-dressed-pink-dark"
          >
            <Sparkles size={16} />
            Create your first look
          </Link>
        </Card>
      </div>
    </main>
  );
}
