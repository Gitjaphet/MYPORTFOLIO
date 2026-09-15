"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import {
  Compass,
  FolderKanban,
  BookOpen,
  ImageDown,
  Gauge,
  DatabaseBackup,
  ActivitySquare,
  Box,
} from "lucide-react";

const ITEM_COLORS = [
  "#a3e635", // lime
  "#F38020", // orange
  "#714B67", // violet
  "#61DAFB", // cyan
  "#a3e635",
  "#F38020",
  "#714B67",
  "#61DAFB",
];

const ITEM_ICONS = [
  Compass,
  FolderKanban,
  BookOpen,
  ImageDown,
  Gauge,
  DatabaseBackup,
  ActivitySquare,
  Box,
];

const ITEM_KEYS = [
  "architecture",
  "cleanCode",
  "apiDocs",
  "images",
  "performance",
  "backups",
  "monitoring",
  "containers",
] as const;

export function EngineeringStandards() {
  const t = useTranslations("EngineeringStandards");

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <Reveal>
        <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("kicker")}
        </p>
        <h2 className="mb-4 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
          {t("title")}
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mb-10 max-w-2xl font-body text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("description")}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ITEM_KEYS.map((key, i) => {
          const Icon = ITEM_ICONS[i];
          const color = ITEM_COLORS[i];

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ "--glow-color": color } as React.CSSProperties}
              className="tech-glow-card"
            >
              <div className="tech-glow-card-inner flex h-full flex-col p-4 transition-transform duration-300 hover:-translate-y-0.5">
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}1a` }}
                >
                  <Icon
                    className="h-[18px] w-[18px]"
                    style={{ color }}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="mb-1.5 font-mono text-[11.5px] tracking-wide"
                  style={{ color }}
                >
                  {t(`items.${key}.label`)}
                </p>
                <p className="font-body text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
