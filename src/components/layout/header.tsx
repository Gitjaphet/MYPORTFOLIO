"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { navLinks } from "@/config/nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";
import { useNavigationProgress } from "@/components/providers/navigation-progress";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();

  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = navLinks.findIndex((link) => link.href === pathname);
  const targetIndex = hoveredIndex ?? activeIndex;
  const isHome = pathname === "/";
  const overDarkHero = isHome && !scrolled;

  useEffect(() => {
    if (targetIndex < 0) {
      setPillStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const el = linkRefs.current[targetIndex];
    const nav = navRef.current;
    if (!el || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setPillStyle({
      x: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [targetIndex, scrolled]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ease-out",
        scrolled ? "pt-3" : "pt-0"
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-out",
          scrolled
            ? "w-[92%] max-w-3xl rounded-full border border-zinc-200/60 bg-white/80 px-5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80"
            : "w-full max-w-none rounded-none border-transparent bg-transparent px-6 py-4"
        )}
      >
        <Link
          href="/"
          className={cn(
            "mr-8 shrink-0 font-heading text-lg italic transition-colors",
            overDarkHero ? "text-white" : "text-zinc-900 dark:text-zinc-100"
          )}
        >
          japhet<span className="text-lime-500">.</span>
        </Link>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav
            ref={navRef}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative flex items-center gap-2 rounded-full p-1.5 font-mono text-sm transition-colors",
              overDarkHero
                ? "bg-white/10 backdrop-blur-sm"
                : "bg-zinc-100/80 dark:bg-zinc-900/80"
            )}
          >
            <span
              className={cn(
                "pointer-events-none absolute left-0 top-1.5 h-[calc(100%-12px)] rounded-full shadow-sm",
                overDarkHero ? "bg-white/90" : "bg-white dark:bg-zinc-700"
              )}
              style={{
                width: pillStyle.width,
                transform: `translateX(${pillStyle.x}px)`,
                opacity: pillStyle.opacity,
                transition:
                  "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), width 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out",
              }}
            />

            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={(e) => {
                  e.preventDefault();
                  startNavigation(() => router.push(link.href));
                }}
                className={cn(
                  "relative z-10 px-5 py-2 transition-colors duration-300",
                  overDarkHero ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400",
                  (hoveredIndex === i || (hoveredIndex === null && activeIndex === i)) && "text-zinc-900"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher inverted={overDarkHero} />
            <ThemeToggle inverted={overDarkHero} />
          </div>
          <MobileNav triggerClassName={overDarkHero ? "text-white hover:bg-white/10" : undefined} />
        </div>
      </header>
    </div>
  );
}