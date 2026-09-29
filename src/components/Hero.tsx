'use client';

import { profile } from '@/data/links';
import { useLocale } from '@/i18n/LocaleProvider';

export function Hero() {
  const { t } = useLocale();
  return (
    <header className="flex flex-col items-center text-center mb-8">
      <div className="relative w-24 h-24 mb-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-accent/40 to-accent p-[2px]"
        >
          <div className="w-full h-full rounded-full bg-background" />
        </div>
        <div className="absolute inset-[2px] rounded-full overflow-hidden">
          {/* Avatar from /public/avatar.jpg. Hidden on missing/404 so the
              ring stays as the placeholder. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={t(profile.nameKey)}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-secondary dark:text-[#F8F5F4]">
        {t(profile.nameKey)}
      </h1>
      <p className="mt-1.5 text-sm text-secondary/70 dark:text-[#F8F5F4]/70">{t(profile.bioKey)}</p>
    </header>
  );
}
