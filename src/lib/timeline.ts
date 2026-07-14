import type { ComponentType } from "react";
import { GraduationCap, Languages, Waves } from "lucide-react";

type TimelineIcon = ComponentType<{ className?: string }>;

export type TimelineEntry = {
  key: string;
  period: string;
  Icon: TimelineIcon;
  imageSrc?: string;
};

export const timelineEntries: TimelineEntry[] = [
  { key: "bacc", period: "2017 — 2018", Icon: GraduationCap, imageSrc: "/images/timeline/bacc.jpg" },
  { key: "english-ylf", period: "2017 — 2018", Icon: Languages, imageSrc: "/images/timeline/english-ylf.jpg" },
  { key: "licence-stic", period: "2022 — 2023", Icon: GraduationCap, imageSrc: "/images/timeline/licence-stic.jpg" },
  { key: "beach-cleanup", period: "2023 — 2024", Icon: Waves, imageSrc: "/images/timeline/beach-cleanup.jpg" },
  { key: "master-tr", period: "2024 — 2025", Icon: GraduationCap, imageSrc: "/images/timeline/master-tr.jpg" },
];