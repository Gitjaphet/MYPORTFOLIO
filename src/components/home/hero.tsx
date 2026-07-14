"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TypewriterText } from "@/components/home/typewriter-text";


function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section
      className="relative -mt-20 overflow-hidden"
      style={{ clipPath: "url(#hero-wave-clip)" }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="hero-wave-clip" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0 L1,0 L1,0.94
                C0.82,0.99 0.68,0.88 0.5,0.93
                C0.32,0.97 0.18,0.87 0,0.93
                Z"
            />
          </clipPath>
        </defs>
      </svg>
      <style>{`
        @keyframes floatY {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.65; }
        }
        @keyframes gamerRing {
            0% { box-shadow: 0 0 20px 4px rgba(163, 230, 53, 0.6), 0 0 40px 10px rgba(56, 189, 248, 0.25); }
            50% { box-shadow: 0 0 28px 6px rgba(56, 189, 248, 0.6), 0 0 50px 14px rgba(163, 230, 53, 0.3); }
            100% { box-shadow: 0 0 20px 4px rgba(163, 230, 53, 0.6), 0 0 40px 10px rgba(56, 189, 248, 0.25); }
        }
        @keyframes blobMorph {
            0%, 100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
            33% { border-radius: 45% 55% 63% 37% / 48% 55% 45% 52%; }
            66% { border-radius: 54% 46% 38% 62% / 62% 44% 56% 38%; }
        }
        .hero-avatar-glow {
            animation: pulseGlow 3s ease-in-out infinite, blobMorph 8s ease-in-out infinite;
        }

        .hero-avatar-frame {
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
            animation:
            floatY 4s ease-in-out infinite,
            gamerRing 2.5s ease-in-out infinite,
            blobMorph 8s ease-in-out infinite;
        }
        `}</style>
  

      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-avatar-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-avatar.webm" type="video/webm" />
          <source src="/videos/hero-avatar.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>
      

      <div className="mx-auto grid min-h-screen max-w-5xl grid-cols-1 items-center gap-10 px-6 pt-32 pb-16 md:grid-cols-[1.3fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-lime-400 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            {t("badge")}
          </div>

          <p className="mb-3 font-mono text-sm text-lime-400">{t("kicker")}</p>

          <h1 className="mb-4 max-w-xl font-heading text-3xl italic leading-tight text-white md:text-4xl">
            <TypewriterText text={t("title")} speed={85} />
          </h1>

          <p className="mb-1 text-zinc-200">{t("subtitle")}</p>
          <p className="mb-8 text-sm text-zinc-400">{t("description")}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group relative overflow-hidden rounded-lg bg-white px-5 py-2.5 font-mono text-sm text-zinc-900 transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">{t("ctaPrimary")}</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-5 py-2.5 font-mono text-sm text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://github.com/Gitjaphet/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/japhet-bezanaka-dev/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:japhetvaleureux@gmail.com"
              aria-label="Email"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/261327756859"
              aria-label="Whatsapp"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative h-[280px] w-[280px]">
            <div className="hero-avatar-glow pointer-events-none absolute -inset-6 bg-lime-400/20 blur-3xl" />
                <div className="hero-avatar-frame relative h-full w-full overflow-hidden border-2 border-white/30">
                    <Image
                    src="/images/hero-avatar-source.jpg"
                    alt="Japhet — avatar 3D"
                    fill
                    sizes="280px"
                    className="object-cover"
                    priority
                    />
                </div>
            </div>
      </div>
    </section>
  );
}