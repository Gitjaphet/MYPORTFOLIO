import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-2 bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-zinc-500">{t('subtitle')}</p>
    </div>
  );
}