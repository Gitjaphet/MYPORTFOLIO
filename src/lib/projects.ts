import type { IconType } from "react-icons";

export type Project = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  description: string;
  features: string[];
  tech: { label: string; colorClass: string }[];
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "art-jatie",
    name: "Art Jatie",
    domain: "artjatie.com/admin/dashboard",
    url: "https://artjatie.com",
    description:
      "Interface d'administration complète pour une boutique e-commerce artisanale : caisse point de vente, gestion de commandes, planning de production, avis clients.",
    features: [
      "Caisse (POS) avec calcul de monnaie et paiement MVola / Orange Money.",
      "Planning de production en kanban : à fabriquer, en cours, prêt à livrer.",
      "Modération des avis clients et suivi des commandes en temps réel.",
    ],
    tech: [
      { label: "Next.js", colorClass: "border-sky-900/40 text-sky-400" },
      { label: "FastAPI", colorClass: "border-teal-900/40 text-teal-400" },
      { label: "PostgreSQL", colorClass: "border-blue-900/40 text-blue-300" },
      { label: "Cloudflare R2", colorClass: "border-orange-900/40 text-orange-300" },
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