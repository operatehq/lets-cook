import { useState } from "react";
import { getDatabaseInfo } from "@/lib/db";

type DatabaseInfo = {
  tableCount: number;
  recipeCount: number;
  databaseSize: string;
};

type UseDatabaseInfoResult = {
  dbInfo: DatabaseInfo | null;
  isLoading: boolean;
  loadDatabaseInfo: () => Promise<void>;
};

export function useDatabaseInfo(): UseDatabaseInfoResult {
  const [dbInfo, setDbInfo] = useState<DatabaseInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadDatabaseInfo = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const info = await getDatabaseInfo();
      setDbInfo(info);
    } catch (error) {
      console.error("Error loading database info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dbInfo,
    isLoading,
    loadDatabaseInfo,
  };
}
