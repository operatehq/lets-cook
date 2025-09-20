import { Recipe } from "@/components/recipe";
import { use } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe",
};

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params) as { slug: string };

  return <Recipe slug={slug} />;
}
