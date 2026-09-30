'use client';

import { useEffect } from 'react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    // Surface client errors so Vercel can capture them. The digest is set
    // by Next.js when running on the server.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="relative">
      <ParticlesBackground id="error-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[480px] px-8 pt-12 pb-16 pt-safe md:px-12 md:pt-16 pb-safe">
        <header className="flex flex-col items-center text-center mb-8">
          <p className="text-sm text-secondary/60 dark:text-[#F8F5F4]/60">Error</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-secondary dark:text-[#F8F5F4]">
            {t('errorTitle')}
          </h1>
          <p className="mt-1.5 text-sm text-secondary/70 dark:text-[#F8F5F4]/70 max-w-[420px]">
            {t('errorBody')}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-secondary px-5 py-3 font-medium text-background transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5F4]"
          >
            {t('errorRetry')}
          </button>
        </header>
        <LocaleSwitcher />
      </main>
    </div>
  );
}