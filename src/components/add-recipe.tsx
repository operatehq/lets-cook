"use client";

import { PlusIcon } from "@phosphor-icons/react/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmojiPickerButton from "@/components/emoji-picker";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { createRecipe, generateSlug } from "@/lib/db";
import { useForm } from "@/hooks/use-form";

interface AddRecipeFormProps {
  onSuccess?: () => void;
}

type FormData = {
  title: string;
  description: string;
  ramblings: string;
  emoji: string;
};

const INITIAL_FORM_DATA: FormData = {
  title: "",
  description: "",
  ramblings: "",
  emoji: "🔥",
} as const;

export function AddRecipe({ onSuccess }: AddRecipeFormProps) {
  const router = useRouter();
  const { formData, updateField, resetForm } =
    useForm<FormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const createRecipeWithSlug = async (): Promise<string> => {
    const slug = generateSlug(formData.title);
    await createRecipe(
      formData.title.trim(),
      slug,
      formData.description.trim(),
      formData.ramblings.trim(),
      formData.emoji,
    );
    return slug;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      const slug = await createRecipeWithSlug();
      resetForm();

      if (onSuccess) {
        onSuccess();
        return;
      }
      router.push(`/recipe/${slug}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormData, value);
  };

  const handleEmojiSelect = (emoji: string) => updateField("emoji", emoji);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-foreground/5 rounded-lg shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">
            Add New Recipe
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Label htmlFor="title" required>
                Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter recipe title..."
                required
              />
            </div>
            <div>
              <Label>Emoji</Label>
              <EmojiPickerButton
                selectedEmoji={formData.emoji}
                onEmojiSelect={handleEmojiSelect}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="ramblings">Chef's Ramblings</Label>
            <Textarea
              id="ramblings"
              name="ramblings"
              value={formData.ramblings}
              onChange={handleInputChange}
              rows={6}
              placeholder="Chef Marvin's story, song, or musings..."
            />
          </div>
          <div>
            <Label htmlFor="description">Recipe Instructions</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              placeholder="Enter recipe instructions..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="accent"
              disabled={isLoading || !formData.title.trim()}
            >
              <PlusIcon size={20} weight="bold" className="text-foreground" />
              Add Recipe
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
