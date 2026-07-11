"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative -mt-20 overflow-hidden">
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
            {t("title")}
          </h1>

          <p className="mb-1 text-zinc-200">{t("subtitle")}</p>
          <p className="mb-8 text-sm text-zinc-400">{t("description")}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-lg bg-white px-5 py-2.5 font-mono text-sm text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-5 py-2.5 font-mono text-sm text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/25 shadow-2xl shadow-black/40">
            <Image
              src="/images/hero-avatar-source.jpg"
              alt="Japhet — avatar 3D"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}