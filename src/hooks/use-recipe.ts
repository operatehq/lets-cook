import { useEffect, useState } from "react";
import { getRecipeBySlug, type Recipe } from "@/lib/db";

type UseRecipeResult = {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useRecipe(slug: string): UseRecipeResult {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipe = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const foundRecipe = await getRecipeBySlug(slug);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setError("Recipe not found");
        setRecipe(null);
      }
    } catch (err) {
      console.error("Error loading recipe:", err);
      setError("Failed to load recipe");
      setRecipe(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipe();
  }, [slug]);

  return {
    recipe,
    isLoading,
    error,
    refetch: loadRecipe,
  };
}
