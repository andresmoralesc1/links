'use client';

import { ParticlesBackground } from '@/components/ParticlesBackground';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="relative">
      <ParticlesBackground id="notfound-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[480px] px-8 pt-12 pb-16 pt-safe md:px-12 md:pt-16 pb-safe">
        <header className="flex flex-col items-center text-center mb-8">
          <p className="text-sm text-secondary/60 dark:text-[#F8F5F4]/60">404</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-secondary dark:text-[#F8F5F4]">
            {t('notFoundTitle')}
          </h1>
          <p className="mt-1.5 text-sm text-secondary/70 dark:text-[#F8F5F4]/70 max-w-[420px]">
            {t('notFoundBody')}
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-secondary px-5 py-3 font-medium text-background transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5F4]"
          >
            {t('notFoundHome')}
          </a>
        </header>
        <LocaleSwitcher />
      </main>
    </div>
  );
}