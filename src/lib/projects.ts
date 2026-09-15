import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiGithubactions,
  SiTraefikproxy,
  SiCloudflare,
  SiAnsible,
  SiGrafana,
  SiPrometheus,
  SiN8N,
  SiDjango,
  SiHtmx,
  SiChartdotjs,
  SiOdoo,
  SiPython,
  SiJoomla,
  SiPhp,
  SiMysql,
  SiApache,
  SiSqlite,
  SiTailwindcss,
  SiFramer,
  SiRedis,
  SiStripe,
} from "react-icons/si";
import { Mail, Server, BrainCircuit, Boxes, Clock, Languages, Search, Database, Megaphone, KeyRound, GitBranch } from "lucide-react";

type TechIcon = ComponentType<{ className?: string; style?: React.CSSProperties }>;

export type Project = {
  slug: string;
  domain: string;
  url: string;
  githubUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  tech: { label: string; Icon: TechIcon; color?: string }[];
  screenshots: string[];
};

export type ProjectContent = Project & {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "art-jatie",
    domain: "artjatie.com/admin/dashboard",
    url: "https://artjatie.com",
    githubUrl: "https://github.com/Gitjaphet/Art-Jatie-Boutique",
    tech: [
      { label: "Next.js", Icon: SiNextdotjs },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { label: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { label: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { label: "Docker", Icon: SiDocker, color: "#2496ED" },
      { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
      { label: "Mailcow", Icon: Mail },
      { label: "Traefik", Icon: SiTraefikproxy, color: "#24A1C1" },
      { label: "Cloudflare R2", Icon: SiCloudflare, color: "#F38020" },
      { label: "VPS", Icon: Server },
      { label: "Ansible", Icon: SiAnsible, color: "#EE0000" },
      { label: "Grafana", Icon: SiGrafana, color: "#F46800" },
      { label: "Prometheus", Icon: SiPrometheus, color: "#E6522C" },
      { label: "LLMs", Icon: BrainCircuit },
      { label: "Embeddings", Icon: Boxes },
      { label: "n8n", Icon: SiN8N, color: "#EA4B71" },
    ],
    screenshots: [
      "/images/projects/art-jatie-01-vue-ensemble.png",
      "/images/projects/art-jatie-02-planning.png",
      "/images/projects/art-jatie-03-caisse-panier.png",
      "/images/projects/art-jatie-04-caisse-paiement.png",
      "/images/projects/art-jatie-05-commandes.png",
      "/images/projects/art-jatie-06-avis-clients.png",
    ],
  },
  {
    slug: "budgy",
    domain: "monentreprise.budgy.artjatie.com/resume",
    url: "https://budgy.medevstack.com",
    githubUrl: "https://github.com/Gitjaphet/Budgy",
    tech: [
      { label: "Django", Icon: SiDjango, color: "#092E20" },
      { label: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { label: "HTMX", Icon: SiHtmx, color: "#3D72D7" },
      { label: "Chart.js", Icon: SiChartdotjs, color: "#FF6384" },
      { label: "Docker", Icon: SiDocker, color: "#2496ED" },
      { label: "Traefik", Icon: SiTraefikproxy, color: "#24A1C1" },
      { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
    ],
    screenshots: [
      "/images/projects/budgy-01-dashboard.png",
      "/images/projects/budgy-02-resume.png",
      "/images/projects/budgy-03-depenses.png",
    ],
  },
  {
    slug: "crm-call-center",
    domain: "localhost:8069/odoo/action-512",
    url: "",
    videoUrl: "https://youtu.be/QJah_xOpSFQ",
    githubUrl: "https://github.com/Gitjaphet/crm_call_center",
    tech: [
      { label: "Odoo 19", Icon: SiOdoo, color: "#714B67" },
      { label: "Python", Icon: SiPython, color: "#3776AB" },
      { label: "OWL", Icon: Boxes },
      { label: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { label: "Cron Jobs", Icon: Clock },
    ],
    screenshots: [
      "/images/projects/crm-call-center-01-session-appel.png",
      "/images/projects/crm-call-center-02-appel-en-cours.png",
      "/images/projects/crm-call-center-03-qualification.png",
      "/images/projects/crm-call-center-04-pipeline.png",
    ],
  },
  {
    slug: "gioia-adventure",
    domain: "gioiaadventure.com/fr",
    url: "https://gioiaadventure.com",
    tech: [
      { label: "Joomla", Icon: SiJoomla, color: "#5091CD" },
      { label: "PHP", Icon: SiPhp, color: "#777BB4" },
      { label: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { label: "Apache", Icon: SiApache, color: "#D22128" },
      { label: "o2switch", Icon: Server },
      { label: "Multilingue", Icon: Languages },
      { label: "SEO", Icon: Search },
    ],
    screenshots: [
      "/images/projects/gioia-adventure-01-accueil.png",
      "/images/projects/o2switch.png",
      "/images/projects/o2switch2.png"
    ],
  },
  {
    slug: "seo-keywords-madagascar",
    domain: "github.com/Gitjaphet/seo-keywords-madagascar",
    url: "",
    githubUrl: "https://github.com/Gitjaphet/seo-keywords-madagascar",
    tech: [
      { label: "Python", Icon: SiPython, color: "#3776AB" },
      { label: "SQLModel", Icon: Database },
      { label: "SQLite", Icon: SiSqlite, color: "#003B57" },
      { label: "Alembic", Icon: GitBranch },
      { label: "Google Ads API", Icon: Megaphone },
      { label: "OAuth 2.0", Icon: KeyRound },
      { label: "Google Autocomplete", Icon: Search },
      { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
    ],
    screenshots: ["/images/projects/seo-keywords-madagascar-01-schema.png"],
  },
  {
    slug: "sakalavatours",
    domain: "sakalavatours.vercel.app",
    url: "https://sakalavatours.vercel.app",
    githubUrl: "https://github.com/Gitjaphet/sakalavatours",
    featured: true,
    tech: [
      { label: "Next.js", Icon: SiNextdotjs },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { label: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
      { label: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { label: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { label: "Redis", Icon: SiRedis, color: "#DC382D" },
      { label: "Alembic", Icon: GitBranch },
      { label: "Stripe", Icon: SiStripe, color: "#635BFF" },
      { label: "Cloudflare R2", Icon: SiCloudflare, color: "#F38020" },
      { label: "Multilingue FR/EN/DE/IT", Icon: Languages },
      { label: "Docker", Icon: SiDocker, color: "#2496ED" },
      { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
    ],
    screenshots: [
      "/images/projects/sakalavatours-01-dashboard.png",
      "/images/projects/sakalavatours-02-dashboard.png",
      "/images/projects/sakalavatours-03-dashboard.png",
      "/images/projects/sakalavatours-04-dashboard.png",
      "/images/projects/sakalavatours-05-dashboard.png",
      "/images/projects/sakalavatours-06-dashboard.png",
    ],
  },
];