import { useEffect, useState } from "react";
import { initDatabase } from "@/lib/db";

type UseDatabaseInitializationResult = {
  isInitialized: boolean;
  error: string | null;
  retry: () => Promise<void>;
};

export function useDatabaseInitialization(): UseDatabaseInitializationResult {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeDatabase = async (): Promise<void> => {
    try {
      setError(null);
      await initDatabase();
      setIsInitialized(true);
    } catch (err) {
      console.error("Failed to initialize database:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  return {
    isInitialized,
    error,
    retry: initializeDatabase,
  };
}
