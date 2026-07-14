"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Mail } from "lucide-react";
import { SiWhatsapp, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const CONTACT_LINKS = [
  {
    key: "email",
    href: "mailto:japhetvaleureux@gmail.com",
    Icon: Mail,
    color: "#a3e635",
  },
  {
    key: "whatsapp",
    href: "https://wa.me/261327756859",
    Icon: SiWhatsapp,
    color: "#25D366",
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/japhet-bezanaka-dev/",
    Icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    key: "github",
    href: "https://github.com/Gitjaphet",
    Icon: SiGithub,
    color: undefined,
  },
] as const;

export function ContactTeaser() {
  const t = useTranslations("ContactTeaser");

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

      <Reveal>
        <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("kicker")}
        </p>
        <h2 className="mb-4 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
          {t("title")}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mb-8 max-w-xl font-body text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("description")}
        </p>
      </Reveal>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex flex-wrap items-center gap-3"
      >
        {CONTACT_LINKS.map(({ key, href, Icon, color }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-black/15 dark:border-white/15 px-3.5 py-2 font-mono text-xs text-zinc-600 dark:text-zinc-300 transition-colors duration-200 hover:border-lime-400/40 hover:text-lime-400"
          >
            <Icon
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{ color: color ?? undefined }}
              aria-hidden="true"
            />
            {t(`links.${key}`)}
          </a>
        ))}
      </motion.div>

      <Reveal delay={0.25}>
        <Button
          asChild
          size="lg"
          className="bg-lime-400 text-black hover:bg-lime-300"
        >
          <Link href="/contact">{t("cta")}</Link>
        </Button>
      </Reveal>
    </section>
  );
}