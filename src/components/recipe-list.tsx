"use client";

import Link from "next/link";
import type { Recipe } from "@/lib/db";
import { PlusIcon } from "@phosphor-icons/react";
import { useRecipes } from "@/hooks/use-recipes";

const RecipeLink = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="flex items-start gap-4 mb-2 font-extrabold text-5xl  group-hover:opacity-80 group-hover:hover:opacity-100 transition-opacity"
    >
      <span>{recipe.emoji}</span>
      <span>{recipe.title}</span>
    </Link>
  );
};

const AddRecipeLink = () => {
  return (
    <Link
      key="new-recipe"
      href={`/new`}
      className="flex items-start gap-4 mb-2 font-extrabold text-5xl opacity-20 group-hover:hover:opacity-100 transition-opacity"
    >
      <span>
        <PlusIcon size={48} weight="bold" className="text-accent" />
      </span>
      <span>Add a Recipe</span>
    </Link>
  );
};

export function RecipeList() {
  const { recipes, isLoading } = useRecipes();

  if (isLoading) return null;
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-foreground/50">
          No recipes yet. Add your first recipe above!
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-8 group">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeLink recipe={recipe} />
        </li>
      ))}
      <li>
        <AddRecipeLink />
      </li>
    </ul>
  );
}
