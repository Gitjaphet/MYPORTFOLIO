"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/projects";

const AUTOPLAY_MS = 4000;

function BrowserMockup({ screenshots, domain, alt }: { screenshots: string[]; domain: string; alt: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    if (paused || screenshots.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next, screenshots.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-col overflow-hidden rounded-lg bg-[#141414]"
    >
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5534b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5c53b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3bb54a]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-[#0a0a0a] px-2.5 py-1 font-mono text-[11px] text-zinc-500">
          {domain}
        </div>
      </div>

      {screenshots.length > 1 && (
        <div className="flex gap-1 px-4 pb-2">
          {screenshots.map((_, i) => (
            <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
              {i === index && !paused && (
                <motion.div
                  key={index}
                  className="h-full bg-lime-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
              {i < index && <div className="h-full w-full bg-lime-400/60" />}
            </div>
          ))}
        </div>
      )}

      <div className="relative mx-3 mb-3 flex-1 overflow-hidden rounded-md bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={screenshots[index]}
              alt={`${alt} — capture ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-top bg-white"
            />
          </motion.div>
        </AnimatePresence>

        {screenshots.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Voir la capture ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-lime-400" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div style={{ "--glow-color": "#A3E635" } as React.CSSProperties} className="tech-glow-card">
      <div className="tech-glow-card-inner grid overflow-hidden rounded-[9px] md:grid-cols-[1.1fr_1fr]">
        <div className="min-h-[280px] p-3">
          <BrowserMockup screenshots={project.screenshots} domain={project.domain} alt={project.name} />
        </div>

        <div className="flex flex-col border-t border-zinc-200 p-6 dark:border-white/10 md:border-l md:border-t-0">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="font-heading text-lg italic leading-snug text-zinc-900 dark:text-white">
              {project.name}
            </h3>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 whitespace-nowrap rounded-md border border-lime-600/30 px-2.5 py-1 font-mono text-[10px] text-lime-600 transition-colors hover:bg-lime-500/10 dark:border-lime-400/30 dark:text-lime-400"
            >
              Voir le site ↗
            </a>
          </div>

          <p className="mb-4 font-mono text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            {project.description}
          </p>

          <ul className="mb-4 flex flex-col gap-1.5">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-1.5 font-mono text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                <span className="text-lime-600 dark:text-lime-400">+</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t.label} className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${t.colorClass}`}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}