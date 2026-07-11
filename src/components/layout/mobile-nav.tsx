"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { navLinks } from "@/config/nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useNavigationProgress } from "@/components/providers/navigation-progress";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-3/4 flex-col">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-heading text-lg italic"
          >
            japhet<span className="text-lime-500">.</span>
          </Link>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 px-4 font-mono text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <button
                key={link.href}
                onClick={() => {
                  setOpen(false);
                  startNavigation(() => router.push(link.href));
                }}
                className={cn(
                  "rounded-md px-3 py-2.5 text-left text-zinc-500 transition-colors dark:text-zinc-400",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {t(link.key)}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}