'use client';

import { links } from '@/data/links';
import { useLocale } from '@/i18n/LocaleProvider';
import { LinkCard } from './LinkCard';

export function LinkList() {
  const { t } = useLocale();
  return (
    <nav
      aria-label={t('navAria')}
      className="flex flex-col gap-3 w-full"
    >
      {links.map((item, i) => (
        <LinkCard key={item.url} item={item} index={i} />
      ))}
    </nav>
  );
}
