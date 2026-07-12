"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiPython,
  SiPhp,
  SiHtml5,
  SiCss,
  SiHtmx,
  SiFastapi,
  SiDjango,
  SiOdoo,
  SiWordpress,
  SiJoomla,
  SiTraefikproxy,
  SiNginx,
  SiApache,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiAnsible,
  SiCloudflare,
  SiGithubactions,
  SiGitlab,
  SiOllama,
  SiLangchain,
  SiN8N,
  SiProxmox,
} from "react-icons/si";
import {
  FileCode2,
  Server,
  Mail,
  Network,
  Boxes,
  BrainCircuit,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type CategoryKey = "languages" | "frameworks" | "cloud" | "ai";

type StackItem = {
  name: string;
  Icon: IconType | typeof FileCode2;
  color?: string;
};

const STACK: Record<CategoryKey, StackItem[]> = {
  languages: [
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "JS ES6+", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "React.js", Icon: SiReact, color: "#61DAFB" },
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "PHP", Icon: SiPhp, color: "#777BB4" },
    { name: "HTML/CSS", Icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", Icon: SiCss, color: "#264DE4" },
    { name: "XML", Icon: FileCode2 },
    { name: "HTMX", Icon: SiHtmx, color: "#3D72D7" },
  ],
  frameworks: [
    { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
    { name: "Django", Icon: SiDjango, color: "#44B78B" },
    { name: "Odoo", Icon: SiOdoo, color: "#714B67" },
    { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
    { name: "Joomla", Icon: SiJoomla, color: "#F44321" },
  ],
  cloud: [
    { name: "Traefik", Icon: SiTraefikproxy, color: "#24A1C1" },
    { name: "Nginx", Icon: SiNginx, color: "#009639" },
    { name: "Apache", Icon: SiApache, color: "#D22128" },
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "Prometheus", Icon: SiPrometheus, color: "#E6522C" },
    { name: "Grafana", Icon: SiGrafana, color: "#F46800" },
    { name: "Ansible", Icon: SiAnsible, color: "#EE0000" },
    { name: "VPS", Icon: Server },
    { name: "Proxmox", Icon: SiProxmox, color: "#E57000" },
    { name: "Cloudflare R2", Icon: SiCloudflare, color: "#F38020" },
    { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
    { name: "GitLab CI/CD", Icon: SiGitlab, color: "#FC6D26" },
    { name: "Mailcow", Icon: Mail },
  ],
  ai: [
    { name: "LLMs", Icon: BrainCircuit },
    { name: "Ollama", Icon: SiOllama },
    { name: "RAG", Icon: Network },
    { name: "Embeddings", Icon: Boxes },
    { name: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
    { name: "n8n", Icon: SiN8N, color: "#EA4B71" },
  ],
};

const TABS: CategoryKey[] = ["languages", "frameworks", "cloud", "ai"];

export function TechStack() {
  const t = useTranslations("TechStack");
  const [active, setActive] = useState<CategoryKey>("languages");

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("kicker")}
        </p>
        <h2 className="mb-8 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
          {t("title")}
        </h2>
      </Reveal>

      {/* --- ONGLETS : ce bloc reste TABS.map, jamais STACK --- */}
      <Reveal delay={0.15}>
        <div
          role="tablist"
          aria-label={t("title")}
          className="relative mb-10 grid grid-cols-2 gap-1 sm:flex sm:w-fit sm:rounded-lg sm:border sm:border-zinc-200 sm:bg-zinc-50 sm:p-1 sm:dark:border-white/10 sm:dark:bg-white/5"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
              className={`relative z-10 cursor-pointer whitespace-nowrap rounded-md border border-zinc-200 px-4 py-2.5 text-center font-mono text-sm transition-colors duration-200 sm:border-0 sm:py-2 dark:border-white/10 ${
                active === tab
                  ? "text-white dark:text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {active === tab && (
                <motion.span
                  layoutId="tech-tab-highlight"
                  className="absolute inset-0 -z-10 rounded-md bg-zinc-900 dark:bg-lime-400"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>
      </Reveal>

      {/* --- GRILLE DE CARTES : c'est ICI que va le glow --- */}
      <Reveal delay={0.25}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
          >
            {STACK[active].map(({ name, Icon, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                style={{ "--glow-color": color ?? "transparent" } as React.CSSProperties}
                className={color ? "tech-glow-card" : "rounded-lg border border-zinc-200 dark:border-white/10"}
              >
                <div
                  className={`group flex cursor-pointer items-center gap-2.5 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                    color ? "tech-glow-card-inner" : "rounded-lg bg-white dark:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      !color ? "text-zinc-400 dark:text-zinc-500" : ""
                    }`}
                    style={{ color: color ?? undefined }}
                  />
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-200">
                    {name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}