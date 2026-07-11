"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useNavigationProgress } from "@/components/providers/navigation-progress";




const locales = ["fr", "en"] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0 });

  const activeIndex = locales.indexOf(locale as (typeof locales)[number]);

  useEffect(() => {
    const el = btnRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setPillStyle({
      x: elRect.left - containerRect.left,
      width: elRect.width,
    });
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center rounded-md border border-zinc-200 bg-zinc-100 p-0.5 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900"
    >
      <span
        className="pointer-events-none absolute top-0.5 h-[calc(100%-4px)] rounded bg-white shadow-sm dark:bg-zinc-700"
        style={{
          width: pillStyle.width,
          transform: `translateX(${pillStyle.x}px)`,
          transition:
            "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      {locales.map((l, i) => (
        <button
          key={l}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          onClick={() =>
            startNavigation(() => router.replace(pathname, { locale: l }))
            }
          className={cn(
            "relative z-10 rounded px-2 py-1 transition-colors duration-300",
            locale === l
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}