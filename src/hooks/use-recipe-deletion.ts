import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteRecipe, type Recipe } from "@/lib/db";

type UseRecipeDeletionResult = {
  isDeleting: boolean;
  deleteRecipe: (recipe: Recipe) => Promise<void>;
};

export function useRecipeDeletion(): UseRecipeDeletionResult {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (recipe: Recipe): Promise<void> => {
    if (
      !confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteRecipe(recipe.id);
      router.push("/");
    } catch (err) {
      console.error("Error deleting recipe:", err);
      throw new Error("Failed to delete recipe");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    deleteRecipe: handleDelete,
  };
}
