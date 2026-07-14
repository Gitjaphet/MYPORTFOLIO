import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactMap } from "@/components/contact/contact-map";
import { Reveal } from "@/components/ui/reveal";
import { TypewriterText } from "@/components/home/typewriter-text";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-32 sm:px-10">
      <Reveal>
        <p className="font-mono text-sm text-lime-500 dark:text-lime-400">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 min-h-[1.2em] font-serif text-4xl italic tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
          <TypewriterText text={t("title")} speed={45} pauseDuration={2500} />
        </h1>
        <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
          {t("subtitle")}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal delay={0.1}>
          <div className="rounded-xl border border-black/5 bg-black/[0.015] p-6 dark:border-white/5 dark:bg-white/[0.02] sm:p-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ContactInfo />
        </Reveal>
      </div>

      <Reveal delay={0.3}>
        <ContactMap locale={locale} />
      </Reveal>
    </main>
  );
}