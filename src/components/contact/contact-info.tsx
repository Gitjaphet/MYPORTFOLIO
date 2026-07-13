import { useTranslations } from "next-intl";

const channels = [
  {
    key: "email",
    href: "mailto:japhetvaleureux@gmail.com",
    value: "japhetvaleureux@gmail.com",
    accent: "border-l-lime-400",
    icon: MailIcon,
  },
  {
    key: "github",
    href: "https://github.com/Gitjaphet",
    value: "github.com/Gitjaphet",
    accent: "border-l-sky-400",
    icon: GithubIcon,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/japhet-bezanaka",
    value: "linkedin.com/in/japhet-bezanaka",
    accent: "border-l-orange-400",
    icon: LinkedinIcon,
  },
] as const;

export function ContactInfo() {
  const t = useTranslations("Contact.info");

  return (
    <div className="flex flex-col gap-4">
      {channels.map(({ key, href, value, accent, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noopener noreferrer"}
          className={`group flex items-center gap-4 rounded-lg border border-black/5 border-l-2 ${accent} bg-black/[0.02] px-5 py-4 transition-colors hover:bg-black/[0.04] dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]`}
        >
          <Icon className="h-5 w-5 shrink-0 text-neutral-500 transition-colors group-hover:text-lime-500 dark:text-neutral-400 dark:group-hover:text-lime-400" />
          <div className="flex min-w-0 flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {t(`${key}.label`)}
            </span>
            <span className="truncate text-sm text-neutral-900 dark:text-neutral-100">
              {value}
            </span>
          </div>
          <span className="ml-auto shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-lime-500 dark:group-hover:text-lime-400">
            ↗
          </span>
        </a>
      ))}

      <div className="mt-2 rounded-lg border border-black/5 bg-black/[0.02] px-5 py-4 font-mono text-xs dark:border-white/5 dark:bg-white/[0.03]">
        <div className="flex items-center gap-2 text-lime-500 dark:text-lime-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500 dark:bg-lime-400" />
          </span>
          {t("availability")}
        </div>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">{t("responseTime")}</p>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">{t("location")}</p>
      </div>
    </div>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 6h16v12H4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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