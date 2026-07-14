"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { timelineEntries } from "@/lib/timeline";
import { Reveal } from "@/components/ui/reveal";
import { Lock, ImageOff } from "lucide-react";

export function Timeline() {
  const t = useTranslations("About.timeline");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("kicker")}
        </p>
        <h2 className="mb-14 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
          {t("title")}
        </h2>
      </Reveal>

      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-200 dark:bg-white/10 md:left-1/2 md:-translate-x-1/2" />

        <div className="flex flex-col gap-10 md:gap-14">
          {timelineEntries.map((entry, i) => {
            const isEven = i % 2 === 0;
            const isActive = activeIndex === i;
            const title = t(`items.${entry.key}.title`);

            return (
              <motion.div
                key={`${entry.key}-${i}`}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                onClick={() => toggle(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex cursor-pointer flex-col gap-4 pl-10 md:flex-row md:items-center md:gap-10 md:pl-0 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                <span
                  className={`absolute left-[13px] top-6 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full transition-colors duration-300 md:left-1/2 ${
                    isActive ? "bg-lime-400" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                />

                <div
                  className={`flex-1 rounded-xl border p-5 transition-all duration-300 ${
                    isActive
                      ? "border-lime-400/40 bg-white shadow-sm dark:bg-white/[0.04]"
                      : "border-zinc-200 bg-white dark:border-white/10 dark:bg-white/[0.02]"
                  } ${isEven ? "md:text-right" : ""}`}
                >
                  <p className="mb-1 font-mono text-xs tracking-wide text-lime-500 dark:text-lime-400">
                    {entry.period}
                  </p>
                  <h3 className="mb-1.5 font-body text-[15px] font-semibold text-zinc-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="font-body text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(`items.${entry.key}.description`)}
                  </p>
                </div>

                <div className="relative aspect-[4/3] flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900">
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      entry.imageSrc ? (
                        <motion.div
                          key="photo"
                          initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 1.03, filter: "blur(4px)" }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={entry.imageSrc}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                          <motion.span
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                            className="absolute right-2.5 top-2.5 rounded-full bg-lime-400 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-black"
                          >
                            {t("unlocked")}
                          </motion.span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
                        >
                          <ImageOff className="h-6 w-6" aria-hidden="true" />
                          <span className="font-mono text-[11px]">{t("placeholder")}</span>
                        </motion.div>
                      )
                    ) : (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 dark:text-zinc-600"
                      >
                        <Lock className="h-5 w-5" aria-hidden="true" />
                        <span className="font-mono text-[11px]">{t("hoverToReveal")}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}