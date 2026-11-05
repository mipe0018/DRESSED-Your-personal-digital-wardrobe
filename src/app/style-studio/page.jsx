
import Link from "next/link";
import { WandSparkles, Shirt, Heart, Sparkles } from "lucide-react";

import AppNavigation from "@/components/layout/app/AppNavigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function StyleStudioPage() {
  return (
    <main className="min-h-screen bg-dressed-pink-light text-dressed-text">
      <AppNavigation />

      <div className="page-container py-10">
        <Badge variant="pink">YOUR PERSONAL STYLING ROOM</Badge>

        <h1 className="mt-4 font-serif text-4xl">Style Studio.</h1>
        <p className="mt-2 text-sm text-dressed-muted">
          Create outfits, experiment with combinations and find your style.
        </p>

        <Card className="mt-8 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dressed-lilac text-dressed-lilac-dark">
            <WandSparkles size={30} />
          </div>

          <h2 className="mt-5 font-serif text-2xl">Your styling space.</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-dressed-muted">
            This is where you will combine pieces from your wardrobe
            and create your own outfits.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-dressed-pink-light px-4 py-3 text-sm">
              <Shirt size={17} />
              Your wardrobe
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-dressed-pink-light px-4 py-3 text-sm">
              <Heart size={17} />
              Saved looks
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-dressed-pink-light px-4 py-3 text-sm">
              <Sparkles size={17} />
              Styling ideas
            </div>
          </div>

          <Link
            href="/wardrobe"
            className="mt-8 inline-flex rounded-full bg-dressed-pink-strong px-6 py-3 text-sm font-bold text-white transition hover:bg-dressed-pink-dark"
          >
            Explore my closet
          </Link>
        </Card>
      </div>
    </main>
  );
}
