"use client";

import { useDatabaseInitialization } from "@/hooks/use-database-initialization";

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const { isInitialized, error, retry } = useDatabaseInitialization();

  if (!isInitialized && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/50">Initializing database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Database Error
          </h1>
          <p className="text-foreground/50 mb-4">{error}</p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-accent text-foreground rounded-lg hover:opacity-80 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
