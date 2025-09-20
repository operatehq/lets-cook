import { AddRecipe } from "@/components/add-recipe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Recipe",
};

export default function NewRecipePage() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <AddRecipe />
    </div>
  );
}
