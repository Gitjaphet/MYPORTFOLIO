import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/project-card";

export function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <p className="mb-2 font-mono text-sm text-lime-500 dark:text-lime-400">{t("kicker")}</p>
      <h2 className="mb-10 font-heading text-2xl italic text-zinc-900 dark:text-white md:text-3xl">
        {t("title")}
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}