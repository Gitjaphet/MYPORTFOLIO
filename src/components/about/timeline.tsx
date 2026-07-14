"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { timelineEntries } from "@/lib/timeline";
import { Reveal } from "@/components/ui/reveal";

function MockPhoto({ imageSrc, alt }: { imageSrc?: string; alt: string }) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="64px"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-zinc-400 dark:text-zinc-600">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8v1H4v-1Z" />
      </svg>
    </div>
  );
}

export function Timeline() {
  const t = useTranslations("About.timeline");

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("kicker")}
        </p>
        <h2 className="mb-10 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
          {t("title")}
        </h2>
      </Reveal>

      <div className="relative">
        <div className="absolute left-8 top-2 bottom-2 w-px bg-zinc-200 dark:bg-white/10 sm:left-9" />

        <div className="flex flex-col gap-8">
          {timelineEntries.map((entry, i) => {
            const Icon = entry.Icon;
            return (
              <motion.div
                key={`${entry.key}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 pl-0 sm:gap-6"
              >
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-lime-400/40 bg-white shadow-sm dark:bg-zinc-900 sm:h-18 sm:w-18">
                  <MockPhoto imageSrc={entry.imageSrc} alt={t(`items.${entry.key}.title`)} />
                  <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-black">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1 pb-2 pt-1">
                  <p className="mb-1 font-mono text-xs tracking-wide text-lime-500 dark:text-lime-400">
                    {entry.period}
                  </p>
                  <h3 className="mb-1.5 font-body text-[15px] font-semibold text-zinc-900 dark:text-white">
                    {t(`items.${entry.key}.title`)}
                  </h3>
                  <p className="font-body text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(`items.${entry.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}