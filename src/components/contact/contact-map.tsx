import { getTranslations } from "next-intl/server";

// Nosy Be (Hell-Ville / Andoany), Madagascar
const LAT = -13.4023;
const LNG = 48.2643;
const ZOOM = 13;

type Props = {
  locale: string;
};

export async function ContactMap({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Contact.map" });

  const embedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const embedSrc = embedKey
    ? `https://www.google.com/maps/embed/v1/view?key=${embedKey}&center=${LAT},${LNG}&zoom=${ZOOM}&maptype=satellite`
    : `https://maps.google.com/maps?q=${LAT},${LNG}&z=${ZOOM}&t=k&output=embed`;

  const openInMapsHref = `https://www.google.com/maps?q=${LAT},${LNG}&z=15&t=k`;

  return (
    <section className="mt-16">
      <p className="font-mono text-sm text-lime-500 dark:text-lime-400">{t("eyebrow")}</p>
      <h2 className="mt-3 font-serif text-3xl italic tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">{t("subtitle")}</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-black/5 bg-black/[0.02] dark:border-white/5 dark:bg-white/[0.02]">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <iframe
            src={embedSrc}
            title={t("iframeTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[15%] contrast-[1.05] dark:grayscale-[35%] dark:brightness-90"
            style={{ border: 0 }}
            allowFullScreen
          />

          {/* Pin overlay, décoratif, pour renforcer le repère visuel sans dépendre du rendu Google */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-black/80 bg-lime-400 dark:border-white" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/5 px-5 py-4 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
            </span>
            {t("address")}
          </div>

          <a
            href={openInMapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-xs text-neutral-600 transition-colors hover:text-lime-600 dark:text-neutral-400 dark:hover:text-lime-400"
          >
            {t("openInMaps")}
            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}