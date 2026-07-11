"use client";

import { useNavigationProgress } from "@/components/providers/navigation-progress";
import { cn } from "@/lib/utils";

export function LoadingIndicator() {
  const { isPending } = useNavigationProgress();

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3 py-2 font-mono text-xs text-zinc-600 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300",
        isPending
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-zinc-400 border-t-transparent dark:border-zinc-500" />
      chargement
    </div>
  );
}