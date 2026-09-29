'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultLocale,
  isLocale,
  locales,
  messages,
  type Locale,
  type MessageKey,
} from './messages';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: MessageKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const COOKIE_NAME = 'links.locale';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)links\.locale=([a-z]{2})/);
  if (match && isLocale(match[1])) return match[1];
  return null;
}

function detectLocale(): Locale | null {
  const stored = readCookieLocale();
  if (stored) return stored;
  // First-visit heuristic: trust the browser language if we support it.
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language?.split('-')[0];
    if (isLocale(lang)) return lang;
  }
  return null;
}

function writeCookie(locale: Locale) {
  if (typeof document === 'undefined') return;
  // SameSite=Lax so the cookie ships with top-level navigations from
  // social previews. Path=/ so the server-side layout can read it on any
  // route (incl. /brief).
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Default to `es` for SSR; client hydrates from cookie / navigator.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const detected = detectLocale();
    if (detected && detected !== defaultLocale) {
      setLocaleState(detected);
      writeCookie(detected);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeCookie(next);
  }, []);

  const t = useCallback(
    (key: MessageKey): string => {
      return messages[locale]?.[key] ?? messages[defaultLocale][key] ?? key;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return ctx;
}

// Re-export for convenience.
export { locales };
