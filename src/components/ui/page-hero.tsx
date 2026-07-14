"use client";

import type { ReactNode } from "react";
import { TypewriterText } from "@/components/home/typewriter-text";

type Stat = { label: string; value: string };

function ProjectCubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M50 8 L88 28 L88 72 L50 92 L12 72 L12 28 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M50 8 L50 50 M50 50 L88 28 M50 50 L12 28 M50 50 L50 92"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function PageHero({
  badge,
  eyebrow,
  title,
  subtitle,
  stats,
  icon,
}: {
  badge?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  stats?: Stat[];
  icon?: ReactNode;
}) {
  return (
    <section
      className="relative -mt-20 overflow-hidden bg-zinc-950"
      style={{ clipPath: "url(#page-hero-wave-clip)" }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="page-hero-wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.92 C0.8,0.98 0.6,0.9 0.4,0.94 C0.25,0.97 0.12,0.9 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      <style>{`
        @keyframes pageHeroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pageHeroGlow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.65; }
        }
        @keyframes pageHeroSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .page-hero-icon {
          animation: pageHeroFloat 4s ease-in-out infinite;
        }
        .page-hero-icon-ring {
          animation: pageHeroSpin 22s linear infinite;
        }
        .page-hero-glow {
          animation: pageHeroGlow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(163,230,53,0.08)_0%,_transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center px-6 pt-32 pb-20 text-center">
        {badge && (
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-lime-400 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                {badge}
            </div>
        )}

        <p className="mb-3 font-mono text-sm text-lime-400">{eyebrow}</p>

        <h1 className="mb-4 max-w-2xl font-heading text-3xl italic leading-tight text-white md:text-5xl">
          <TypewriterText text={title} speed={85} />
        </h1>

        <p className="mb-14 max-w-lg text-sm text-zinc-400 md:text-base">
          {subtitle}
        </p>

        <div className="relative flex h-40 w-40 items-center justify-center md:h-48 md:w-48">
          <div className="page-hero-glow pointer-events-none absolute inset-0 rounded-full bg-lime-400/25 blur-3xl" />
          <div className="page-hero-icon-ring absolute inset-0 rounded-full border border-dashed border-lime-400/20" />
          <div className="page-hero-icon relative text-lime-400">
            {icon ?? <ProjectCubeIcon className="h-20 w-20 md:h-24 md:w-24" />}
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="absolute bottom-16 right-6 hidden flex-col gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm sm:flex md:bottom-20">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                <span className="text-zinc-400">{stat.label}</span>
                <span className="font-mono font-semibold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}