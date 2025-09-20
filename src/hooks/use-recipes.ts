import { useEffect, useState } from "react";
import { getAllRecipes, type Recipe } from "@/lib/db";

type UseRecipesResult = {
  recipes: Recipe[];
  isLoading: boolean;
  refetch: () => Promise<void>;
};

export function useRecipes(): UseRecipesResult {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecipes = async (): Promise<void> => {
    try {
      const allRecipes = await getAllRecipes();
      setRecipes(allRecipes);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  return { recipes, isLoading, refetch: loadRecipes };
}
