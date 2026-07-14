import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-3xl flex-col items-center justify-center px-6 pb-24 pt-32 text-center sm:px-10">
      <p className="font-mono text-sm text-lime-500 dark:text-lime-400">{t("eyebrow")}</p>

      <h1 className="mt-3 font-serif text-4xl italic tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
        {t("title")}
        <span className="ml-2 inline-block h-8 w-2 translate-y-1 bg-lime-400 align-middle sm:h-10" />
      </h1>

      <p className="mt-5 max-w-md text-neutral-600 dark:text-neutral-400">{t("subtitle")}</p>

      {/* Bloc terminal décoratif, cohérent avec l'identité "dev boss" du site */}
      <div className="mt-10 w-full max-w-md overflow-hidden rounded-xl border border-black/5 bg-black/[0.02] text-left dark:border-white/5 dark:bg-white/[0.03]">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-2.5 dark:border-white/5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime-400/70" />
        </div>
        <div className="space-y-1.5 px-4 py-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <p>
            <span className="text-lime-500 dark:text-lime-400">$</span> {t("terminal.status")}
          </p>
          <p className="pl-4">→ {t("terminal.line1")}</p>
          <p className="pl-4">→ {t("terminal.line2")}</p>
          <p className="flex items-center gap-2 pl-4 text-lime-500 dark:text-lime-400">
            → {t("terminal.line3")}
            <span className="inline-block h-3 w-1.5 animate-pulse bg-lime-400" />
          </p>
        </div>
      </div>

      <Link
        href="/contact"
        className="mt-10 inline-flex items-center gap-2 rounded-md border border-lime-500/40 bg-lime-400 px-6 py-3 font-mono text-sm font-medium text-black transition-colors hover:bg-lime-300"
      >
        {t("cta")}
        <span>→</span>
      </Link>
    </main>
  );
}