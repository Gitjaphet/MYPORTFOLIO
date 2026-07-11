"use client";

import { createContext, useContext, useTransition } from "react";

type NavigationProgressContextType = {
  isPending: boolean;
  startNavigation: (action: () => void) => void;
};

const NavigationProgressContext = createContext<NavigationProgressContextType | null>(null);

export function NavigationProgressProvider({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();

  const startNavigation = (action: () => void) => {
    startTransition(() => {
      action();
    });
  };

  return (
    <NavigationProgressContext.Provider value={{ isPending, startNavigation }}>
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  const ctx = useContext(NavigationProgressContext);
  if (!ctx) {
    throw new Error("useNavigationProgress must be used within NavigationProgressProvider");
  }
  return ctx;
}