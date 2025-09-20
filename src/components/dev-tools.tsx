"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { clearAllRecipes, resetDatabase } from "@/lib/db";
import { GearIcon, XIcon } from "@phosphor-icons/react/ssr";
import { useDatabaseInfo } from "@/hooks/use-database-info";

interface DevToolsProps {
  onDatabaseReset?: () => void;
}

type DatabaseOperation = {
  name: string;
  action: () => Promise<void>;
  confirmMessage: string;
};

export function DevTools({ onDatabaseReset }: DevToolsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dbInfo, loadDatabaseInfo } = useDatabaseInfo();

  const executeDatabaseOperation = async (
    operation: DatabaseOperation,
  ): Promise<void> => {
    if (!confirm(operation.confirmMessage)) return;

    setIsLoading(true);
    try {
      await operation.action();
      onDatabaseReset?.();
      window.dispatchEvent(new CustomEvent("databaseReset"));
      await loadDatabaseInfo();
    } catch (error) {
      console.error(`Error executing ${operation.name}:`, error);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  const databaseOperations: DatabaseOperation[] = [
    {
      name: "clear recipes",
      action: clearAllRecipes,
      confirmMessage: "Are you sure you want to clear all recipes?",
    },
    {
      name: "reset database",
      action: resetDatabase,
      confirmMessage:
        "Are you sure you want to reset the entire database? This will delete all data and reset the database to its initial state with example data!",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      loadDatabaseInfo();
    }
  }, [isOpen]);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-3 right-3 z-50 shadow-lg p-0"
        title="Developer Tools"
      >
        <GearIcon
          size={24}
          weight="bold"
          className="text-white flex-shrink-0"
        />
      </Button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 bg-background order-first border-white/10  border-2 rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Developer Tools</h3>
            <Button
              variant="ghost"
              size="icon"
              className="p-0"
              onClick={() => setIsOpen(false)}
            >
              <XIcon size={24} weight="bold" className="flex-shrink-0" />
            </Button>
          </div>
          {dbInfo && (
            <div className="mb-4 p-4 bg-white/10 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Database Info</h4>
              <div className="text-xs space-y-1 text-foreground">
                <div>Tables: {dbInfo.tableCount}</div>
                <div>Recipes: {dbInfo.recipeCount}</div>
              </div>
            </div>
          )}
          <div className="space-y-2 mb-4">
            {databaseOperations.map((operation, index) => (
              <Button
                key={operation.name}
                variant={index === 0 ? "warning" : "destructive"}
                size="sm"
                onClick={() => executeDatabaseOperation(operation)}
                disabled={isLoading}
                className="w-full"
              >
                {operation.name === "clear recipes"
                  ? "Clear All Recipes"
                  : "Reset Database"}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
