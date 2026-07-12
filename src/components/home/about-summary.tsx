"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { Code2, ServerCog, Rocket, MapPin } from "lucide-react";

const CARD_COLORS = ["#714B67", "#F38020", "#61DAFB"];
const CARD_ICONS = [Code2, ServerCog, Rocket];

export function AboutSummary() {
  const t = useTranslations("AboutSummary");
  const cards = t.raw("cards") as { label: string; description: string }[];
  const steps = t.raw("method.steps") as string[];

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      {/* halo décoratif, cohérent avec le reste du site */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

      <Reveal>
        <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("kicker")}
        </p>
        <h2 className="mb-6 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
          {t("title")}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mb-10 max-w-2xl font-body text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("description")}
        </p>
      </Reveal>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((card, i) => {
            const Icon = CARD_ICONS[i];
            return (
            <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ "--glow-color": CARD_COLORS[i] } as React.CSSProperties}
                className="tech-glow-card"
            >
                <div className="tech-glow-card-inner h-full p-4 transition-transform duration-300 hover:-translate-y-0.5">
                <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${CARD_COLORS[i]}1a` }}
                >
                    <Icon
                    className="h-[18px] w-[18px]"
                    style={{ color: CARD_COLORS[i] }}
                    aria-hidden="true"
                    />
                </div>
                <p
                    className="mb-2.5 font-body text-[13px] tracking-wide"
                    style={{ color: CARD_COLORS[i] }}
                >
                    {card.label}
                </p>
                <p className="font-body text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {card.description}
                </p>
                </div>
            </motion.div>
            );
        })}
        </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ "--glow-color": "#a3e635" } as React.CSSProperties}
        className="tech-glow-card"
      >
        <div className="tech-glow-card-inner p-4 sm:p-5">
          <p className="mb-3.5 font-mono text-[12.5px] tracking-wide text-lime-500 dark:text-lime-400">
            {t("method.title")}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1.5 font-body text-[14px] text-zinc-700 dark:text-zinc-200">
                  <span className="font-bold text-lime-500 dark:text-lime-400">{i + 1}</span>
                  {step}
                </div>
                {i < steps.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-600">→</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Reveal delay={0.35}>
        <p className="mt-3.5 flex items-center gap-1.5 font-body text-[13px] text-zinc-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t("location")}
        </p>
      </Reveal>
    </section>
  );
}