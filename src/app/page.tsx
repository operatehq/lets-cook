import { RecipeList } from "@/components/recipe-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's Cook › My Recipes",
};

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <RecipeList />
      </main>
    </div>
  );
}
