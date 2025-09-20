"use client";

import { Button } from "@/components/button";
import { ArrowLeftIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { useRecipe } from "@/hooks/use-recipe";
import { useRecipeDeletion } from "@/hooks/use-recipe-deletion";
import { type Recipe } from "@/lib/db";

interface RecipeViewerProps {
  slug: string;
}

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-foreground/50">Loading recipe...</p>
    </div>
  </div>
);

const ErrorState = ({ error }: { error: string | null }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-extrabold text-foreground mb-4">
        Recipe Not Found
      </h1>
      <p className="text-foreground/50 mb-8">
        {error || "The recipe you're looking for doesn't exist."}
      </p>
      <Button as="link" href="/" variant="link">
        <ArrowLeftIcon weight="bold" size={20} /> Back to Recipes
      </Button>
    </div>
  </div>
);

const RecipeHeader = ({
  recipe,
  isDeleting,
  onDelete,
}: {
  recipe: Recipe;
  isDeleting: boolean;
  onDelete: () => void;
}) => (
  <header className="space-y-4">
    <div className="flex justify-between items-start">
      <div className="flex items-start gap-4 pr-2 text-balance">
        <span className="text-5xl">{recipe.emoji}</span>
        <h1 className="text-5xl font-extrabold text-foreground">
          {recipe.title}
        </h1>
      </div>
      <Button
        variant="destructive"
        onClick={onDelete}
        size="square"
        disabled={isDeleting}
      >
        <TrashIcon weight="bold" size={20} />
      </Button>
    </div>
  </header>
);

const RecipeContent = ({ recipe }: { recipe: Recipe }) => (
  <>
    {recipe.ramblings && (
      <div className="space-y-4">
        <div className="bg-foreground/5 rounded-lg p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Chef's Ramblings
          </h2>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap text-lg italic">
            {recipe.ramblings}
          </p>
        </div>
      </div>
    )}

    {recipe.description && (
      <div className="space-y-4">
        <div className="bg-foreground/5 rounded-lg p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Recipe Instructions
          </h2>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap text-lg">
            {recipe.description}
          </p>
        </div>
      </div>
    )}

    {!recipe.description && !recipe.ramblings && (
      <div className="text-center py-12">
        <p className="text-foreground/50 text-lg">
          No content available for this recipe.
        </p>
      </div>
    )}
  </>
);

export function Recipe({ slug }: RecipeViewerProps) {
  const { recipe, isLoading, error } = useRecipe(slug);
  const { isDeleting, deleteRecipe: handleDelete } = useRecipeDeletion();

  if (isLoading) return <LoadingState />;
  if (error || !recipe) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <article className="space-y-8">
          <RecipeHeader
            recipe={recipe}
            isDeleting={isDeleting}
            onDelete={() => handleDelete(recipe)}
          />
          <RecipeContent recipe={recipe} />
        </article>
      </main>
    </div>
  );
}
