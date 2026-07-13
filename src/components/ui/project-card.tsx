"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectContent } from "@/lib/projects";
import { TypewriterText } from "@/components/home/typewriter-text";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { useTranslations } from "next-intl";
import { SiGithub, SiYoutube } from "react-icons/si";

const AUTOPLAY_MS = 4000;

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const configs = {
    tl: { corner: "top-3 left-3", path: "M1,16 L1,1 L16,1" },
    tr: { corner: "top-3 right-3", path: "M0,1 L15,1 L15,16" },
    bl: { corner: "bottom-3 left-3", path: "M1,0 L1,15 L16,15" },
    br: { corner: "bottom-3 right-3", path: "M0,15 L15,15 L15,0" },
  };
  const { corner, path } = configs[position];

  return (
    <svg viewBox="0 0 16 16" className={`absolute ${corner} h-4 w-4`} fill="none">
      <motion.path
        d={path}
        stroke="#a3e635"
        strokeWidth="1.5"
        strokeLinecap="square"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function BrowserMockup({
  screenshots,
  domain,
  alt,
  onImageClick,
}: {
  screenshots: string[];
  domain: string;
  alt: string;
  onImageClick: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl"
    >
      <div className="flex shrink-0 items-center gap-2 px-5 pt-4 pb-2.5">
        <span className="h-3 w-3 rounded-full bg-[#e5534b]" />
        <span className="h-3 w-3 rounded-full bg-[#e5c53b]" />
        <span className="h-3 w-3 rounded-full bg-[#3bb54a]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-black/40 px-3 py-1.5 font-mono text-xs text-zinc-400">
          {domain}
        </div>
      </div>

      {screenshots.length > 1 && (
        <div className="flex shrink-0 gap-1 px-5 pb-2.5">
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

      <button
        onClick={() => onImageClick(index)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Agrandir la capture"
        className="group relative mx-4 mb-4 min-h-0 flex-1 cursor-zoom-in overflow-hidden rounded-lg bg-white text-left"
      >
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
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain object-top bg-white"
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {hovered && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute inset-0 bg-black/10"
              />

              <motion.div
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="pointer-events-none absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-lime-400 to-transparent shadow-[0_0_8px_1px_rgba(163,230,53,0.6)]"
              />

              <CornerBracket position="tl" />
              <CornerBracket position="tr" />
              <CornerBracket position="bl" />
              <CornerBracket position="br" />

              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1 font-mono text-[10px] text-lime-400 backdrop-blur-sm"
              >
                <span className="h-1 w-1 rounded-full bg-lime-400" />
                agrandir.png
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {screenshots.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
            {screenshots.map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-lime-500" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectContent }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const t = useTranslations("FeaturedProjects");


  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-2.5 md:p-3">
      <div className="grid gap-3 md:grid-cols-[1.35fr_1fr]">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-[#0d1a08] to-black p-6 md:p-8">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

          <h3 className="relative mb-6 min-h-[4.5rem] font-heading text-2xl italic leading-snug text-white md:text-3xl">
            <TypewriterText text={project.tagline} speed={100} pauseDuration={3000} />
          </h3>

          <div className="relative h-[380px] md:h-[440px]">
            <BrowserMockup
              screenshots={project.screenshots}
              domain={project.domain}
              alt={project.name}
              onImageClick={(index) => setLightboxIndex(index)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-5 w-[3px] rounded-full bg-lime-400" />
            <h4 className="min-h-[1.75rem] font-heading text-xl italic text-zinc-900 dark:text-white">
              <TypewriterText text={project.name} speed={150} pauseDuration={3000} />
            </h4>
            <div className="ml-auto flex shrink-0 items-center gap-2">
                {project.githubUrl && (
                    <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Voir le code source sur GitHub"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 dark:border-white/15 text-zinc-600 dark:text-zinc-300 transition-colors duration-200 hover:border-lime-400/40 hover:text-lime-400"
                    >
                    <SiGithub
                        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[8deg]"
                        aria-hidden="true"
                    />
                    </motion.a>
                  )}
                  {project.url ? (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="group whitespace-nowrap rounded-lg border border-black/15 dark:border-white/15 px-3 py-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-300 transition-colors duration-200 hover:border-lime-400/40 hover:text-lime-400"
                    >
                      {t("viewSite")}{" "}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </motion.a>
                  ) : project.videoUrl ? (
                    <motion.a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="group flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-black/15 dark:border-white/15 px-3 py-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-300 transition-colors duration-200 hover:border-lime-400/40 hover:text-lime-400"
                    >
                      <SiYoutube className="h-3.5 w-3.5 text-red-500" />
                      {t("viewDemo")}
                    </motion.a>
                  ) : null}
                </div>
          </div>

          <p className="mb-6 font-body text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>

          <ul className="mb-7 flex flex-col gap-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 font-body text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                <span className="mt-0.5 shrink-0 text-lime-400">+</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(({ label, Icon, color }) => (
                <div
                key={label}
                style={{ "--glow-color": color ?? "transparent" } as React.CSSProperties}
                className={color ? "tech-glow-card" : "rounded-md border border-zinc-200 dark:border-white/10"}
                >
                <div
                    className={`group flex cursor-default items-center gap-1.5 whitespace-nowrap px-2 py-1.5 transition-all duration-200 hover:-translate-y-0.5 ${
                    color ? "tech-glow-card-inner" : "rounded-md bg-white dark:bg-white/5"
                    }`}
                >
                    <Icon
                    className={`h-3 w-3 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        !color ? "text-zinc-400 dark:text-zinc-500" : ""
                    }`}
                    style={{ color: color ?? undefined }}
                    />
                    <span className="font-mono text-[10px] leading-tight text-zinc-700 dark:text-zinc-200">{label}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={project.screenshots}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          alt={project.name}
        />
      )}
    </div>
  );
}