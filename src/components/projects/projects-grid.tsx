"use client";

import { useTranslations } from "next-intl";
import { projects as allProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";

export function ProjectsGrid() {
  const t = useTranslations("FeaturedProjects");

  const sorted = [...allProjects].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
  );

  return (
    <div className="flex flex-col gap-8">
      {sorted.map((project, i) => (
        <Reveal key={project.slug} delay={Math.min(i * 0.08, 0.4)}>
          <ProjectCard
            project={{
              ...project,
              name: t(`projects.${project.slug}.name`),
              tagline: t(`projects.${project.slug}.tagline`),
              description: t(`projects.${project.slug}.description`),
              features: t.raw(`projects.${project.slug}.features`) as string[],
            }}
          />
        </Reveal>
      ))}
    </div>
  );
}