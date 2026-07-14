import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Timeline } from "@/components/about/timeline";
import { Reveal } from "@/components/ui/reveal";
import { MapPin } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const tSummary = await getTranslations({ locale, namespace: "AboutSummary" });

  const cards = tSummary.raw("cards") as { label: string; description: string }[];
  const steps = tSummary.raw("method.steps") as string[];

  return (
    <>
      <PageHero
        badge={t("hero.badge")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <main className="mx-auto w-full max-w-3xl px-6 pb-4 pt-16 sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center font-body text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {tSummary("description")}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <p className="mb-2 font-mono text-[12px] tracking-wide text-lime-500 dark:text-lime-400">
                {card.label}
              </p>
              <p className="font-body text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5">
          <p className="mb-3.5 font-mono text-[12.5px] tracking-wide text-lime-500 dark:text-lime-400">
            {tSummary("method.title")}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 font-body text-[14px] text-zinc-700 dark:text-zinc-200">
                  <span className="font-bold text-lime-500 dark:text-lime-400">{i + 1}</span>
                  {step}
                </div>
                {i < steps.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-600">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 font-body text-[13px] text-zinc-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {tSummary("location")}
        </p>
      </main>

      <Timeline />
    </>
  );
}