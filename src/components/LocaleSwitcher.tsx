'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { localeMeta, locales, type Locale } from '@/i18n/messages';

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Idioma"
      className="mt-6 flex items-center justify-center gap-2"
    >
      {locales.map((code: Locale) => {
        const meta = localeMeta[code];
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={meta.label}
            title={meta.label}
            className={
              'inline-flex h-11 w-11 items-center justify-center rounded-full text-lg ' +
              'transition-transform duration-150 ' +
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
              'focus-visible:ring-offset-background dark:focus-visible:ring-offset-[#15110d] ' +
              (active
                ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-background dark:ring-offset-[#15110d]'
                : 'opacity-60 hover:opacity-100 hover:scale-105')
            }
          >
            <span aria-hidden="true">{meta.flag}</span>
          </button>
        );
      })}
    </div>
  );
}