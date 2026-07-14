import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { PageHero } from "@/components/ui/page-hero";
import { projects } from "@/lib/projects";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });

  const techCount = new Set(projects.flatMap((p) => p.tech.map((t) => t.label))).size;

  return (
    <>
      <PageHero
        badge={t("badge")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        stats={[
          { label: t("stats.projects"), value: `${projects.length}+` },
          { label: t("stats.tech"), value: `${techCount}+` },
        ]}
      />

      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-16 sm:px-10">
        <ProjectsGrid />
      </main>
    </>
  );
}