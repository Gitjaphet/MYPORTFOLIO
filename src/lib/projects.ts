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
} from "react-icons/si";
import { Mail, Server, BrainCircuit, Boxes } from "lucide-react";

type TechIcon = ComponentType<{ className?: string; style?: React.CSSProperties }>;

export type Project = {
  slug: string;
  domain: string;
  url: string;
  githubUrl?: string;
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
];