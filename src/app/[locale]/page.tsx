import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      <ThemeToggle />
      <h1 className="text-4xl font-bold font-heading">{t('title')}</h1>
      <p className="text-zinc-500">{t('subtitle')}</p>
    </div>
  );
}