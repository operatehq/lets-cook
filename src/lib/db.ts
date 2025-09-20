import { PGlite } from "@electric-sql/pglite";
import { neapolitanPizza } from "@/chef-ramblings/pizza";
import { bltSandwich } from "@/chef-ramblings/blt";
import { noucCham } from "@/chef-ramblings/nouc-cham";
import { cassoulet } from "@/chef-ramblings/cassoulet";
import { oliveOilCake } from "@/chef-ramblings/olive-oil-cake";

// Remember this is only a client-based local database
// for development purposes
let db: PGlite;

const initializeDb = () => {
  if (!db) {
    try {
      db = new PGlite("idb://recipe-db");
    } catch (error) {
      console.error("Failed to initialize PGlite:", error);
      throw new Error("Database initialization failed");
    }
  }
  return db;
};

export interface Recipe {
  id: number;
  title: string;
  slug: string;
  description: string;
  ramblings: string;
  emoji: string;
  created_at: string;
}

// Initialize database schema
export async function initDatabase(): Promise<void> {
  try {
    const database = initializeDb();
    await database.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        ramblings TEXT,
        emoji VARCHAR(10) DEFAULT '🍽️',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.error("Error initializing database:", error);
    throw new Error(
      `Database initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

// Create a new recipe
export async function createRecipe(
  title: string,
  slug: string,
  description: string,
  ramblings: string = "",
  emoji: string = "🍽️",
): Promise<Recipe> {
  const database = initializeDb();
  const result = await database.query(
    `
    INSERT INTO recipes (title, slug, description, ramblings, emoji)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [title, slug, description, ramblings, emoji],
  );

  return result.rows[0] as Recipe;
}

// Get all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  const database = initializeDb();
  const result = await database.query(`
    SELECT * FROM recipes
    ORDER BY created_at DESC
  `);

  return result.rows as Recipe[];
}

// Get recipe by slug
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const database = initializeDb();
  const result = await database.query(
    `
    SELECT * FROM recipes
    WHERE slug = $1
  `,
    [slug],
  );

  return (result.rows[0] as Recipe) || null;
}

// Update recipe
export async function updateRecipe(
  id: number,
  title: string,
  slug: string,
  description: string,
  ramblings: string,
  emoji: string,
): Promise<Recipe> {
  const database = initializeDb();
  const result = await database.query(
    `
    UPDATE recipes
    SET title = $1, slug = $2, description = $3, ramblings = $4, emoji = $5
    WHERE id = $6
    RETURNING *
  `,
    [title, slug, description, ramblings, emoji, id],
  );

  return result.rows[0] as Recipe;
}

// Delete recipe
export async function deleteRecipe(id: number): Promise<void> {
  const database = initializeDb();
  await database.query(
    `
    DELETE FROM recipes
    WHERE id = $1
  `,
    [id],
  );
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Load dummy data from chef-ramblings
async function loadDummyData(): Promise<void> {
  const dummyRecipes = [
    {
      title: oliveOilCake.title,
      description: oliveOilCake.recipe,
      ramblings: oliveOilCake.ramblings,
      emoji: oliveOilCake.emoji,
    },
    {
      title: cassoulet.title,
      description: cassoulet.recipe,
      ramblings: cassoulet.ramblings,
      emoji: cassoulet.emoji,
    },
    {
      title: bltSandwich.title,
      description: bltSandwich.recipe,
      ramblings: bltSandwich.ramblings,
      emoji: bltSandwich.emoji,
    },
    {
      title: noucCham.title,
      description: noucCham.recipe,
      ramblings: noucCham.ramblings,
      emoji: noucCham.emoji,
    },
    {
      title: neapolitanPizza.title,
      description: neapolitanPizza.recipe,
      ramblings: neapolitanPizza.ramblings,
      emoji: neapolitanPizza.emoji,
    },
  ];

  for (const recipe of dummyRecipes) {
    const slug = generateSlug(recipe.title);
    await createRecipe(
      recipe.title,
      slug,
      recipe.description,
      recipe.ramblings,
      recipe.emoji,
    );
  }
}

// Development helpers
export async function resetDatabase(): Promise<void> {
  try {
    const database = initializeDb();
    await database.query("DROP TABLE IF EXISTS recipes CASCADE");
    await initDatabase();
    await loadDummyData();
  } catch (error) {
    console.error("Error resetting database:", error);
    throw new Error(
      `Database reset failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function clearAllRecipes(): Promise<void> {
  try {
    const database = initializeDb();
    await database.query("DELETE FROM recipes");
  } catch (error) {
    console.error("Error clearing recipes:", error);
    throw new Error(
      `Clear recipes failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getDatabaseInfo(): Promise<{
  tableCount: number;
  recipeCount: number;
  databaseSize: string;
}> {
  const database = initializeDb();
  const tablesResult = await database.query(`
    SELECT COUNT(*) as count
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);

  const recipeCountResult = await database.query(
    "SELECT COUNT(*) as count FROM recipes",
  );

  return {
    tableCount: parseInt((tablesResult.rows[0] as { count: string }).count),
    recipeCount: parseInt(
      (recipeCountResult.rows[0] as { count: string }).count,
    ),
    databaseSize: "N/A (IndexedDB)", // PGlite doesn't expose size info easily
  };
}

export async function runMigration(sql: string): Promise<void> {
  const database = initializeDb();
  await database.query(sql);
}
