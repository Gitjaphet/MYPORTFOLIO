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
} from "react-icons/si";
import {
  FileCode2,
  Server,
  Mail,
  Network,
  Boxes,
  BrainCircuit,
} from "lucide-react";
import { TechGridBackground } from "@/components/ui/tech-grid-background";

type CategoryKey = "languages" | "frameworks" | "cloud" | "ai";

type StackItem = {
  name: string;
  Icon: IconType | typeof FileCode2;
};

const STACK: Record<CategoryKey, StackItem[]> = {
  languages: [
    { name: "TypeScript", Icon: SiTypescript },
    { name: "JavaScript ES6+", Icon: SiJavascript },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "React.js", Icon: SiReact },
    { name: "Python", Icon: SiPython },
    { name: "PHP", Icon: SiPhp },
    { name: "HTML/CSS", Icon: SiHtml5 },
    { name: "CSS3", Icon: SiCss },
    { name: "XML", Icon: FileCode2 },
    { name: "HTMX", Icon: SiHtmx },
  ],
  frameworks: [
    { name: "FastAPI", Icon: SiFastapi },
    { name: "Django", Icon: SiDjango },
    { name: "Odoo", Icon: SiOdoo },
    { name: "WordPress", Icon: SiWordpress },
    { name: "Joomla", Icon: SiJoomla },
  ],
  cloud: [
    { name: "Traefik", Icon: SiTraefikproxy },
    { name: "Nginx", Icon: SiNginx },
    { name: "Apache", Icon: SiApache },
    { name: "Docker", Icon: SiDocker },
    { name: "Prometheus", Icon: SiPrometheus },
    { name: "Grafana", Icon: SiGrafana },
    { name: "Ansible", Icon: SiAnsible },
    { name: "VPS", Icon: Server },
    { name: "Cloudflare R2", Icon: SiCloudflare },
    { name: "GitHub Actions", Icon: SiGithubactions },
    { name: "GitLab CI/CD", Icon: SiGitlab },
    { name: "Mailcow", Icon: Mail },
  ],
  ai: [
    { name: "LLMs", Icon: BrainCircuit },
    { name: "Ollama", Icon: SiOllama },
    { name: "RAG", Icon: Network },
    { name: "Embeddings", Icon: Boxes },
    { name: "LangChain", Icon: SiLangchain },
    { name: "n8n", Icon: SiN8N },
  ],
};

const TABS: CategoryKey[] = ["languages", "frameworks", "cloud", "ai"];

export function TechStack() {
  const t = useTranslations("TechStack");
  const [active, setActive] = useState<CategoryKey>("languages");

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
        <TechGridBackground />

      <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">
        {t("kicker")}
      </p>
      <h2 className="mb-8 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
        {t("title")}
      </h2>

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

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
        >
          {STACK[active].map(({ name, Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="group flex cursor-pointer items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
            >
              <Icon className="h-4 w-4 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-lime-500 dark:text-zinc-500 dark:group-hover:text-lime-400" />
              <span className="font-mono text-sm text-zinc-700 dark:text-zinc-200">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}