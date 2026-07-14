import { getTranslations } from "next-intl/server";

type Props = {
  locale: string;
};

export async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        {/* Gauche : copyright + localisation */}
        <div className="flex flex-col gap-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            © {year} Japhet Bezanaka —{" "}
            <span className="text-neutral-600 dark:text-neutral-300">{t("location")}</span>
          </span>
          <span className="text-neutral-400 dark:text-neutral-600">{t("builtWith")}</span>
        </div>

        {/* Droite : now-building + réseaux sociaux */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.02] px-3 py-1.5 font-mono text-xs text-neutral-600 dark:border-white/5 dark:bg-white/[0.03] dark:text-neutral-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
            </span>
            {t("nowBuilding")}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Gitjaphet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-neutral-500 transition-colors hover:text-lime-500 dark:text-neutral-400 dark:hover:text-lime-400"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/japhet-bezanaka"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-neutral-500 transition-colors hover:text-lime-500 dark:text-neutral-400 dark:hover:text-lime-400"
            >
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="mailto:japhetvaleureux@gmail.com"
              aria-label="Email"
              className="text-neutral-500 transition-colors hover:text-lime-500 dark:text-neutral-400 dark:hover:text-lime-400"
            >
              <MailIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.94 1.94 0 1 0 5.25 7.38 1.94 1.94 0 0 0 5.25 3.5ZM20.44 20.5H17.06V14.65C17.06 13.24 17.03 11.43 15.09 11.43C13.12 11.43 12.82 12.97 12.82 14.55V20.5H9.44V8.5H12.68V10.02H12.73C13.19 9.15 14.31 8.23 15.98 8.23C19.4 8.23 20.44 10.47 20.44 13.68V20.5Z" />
    </svg>
  );
}