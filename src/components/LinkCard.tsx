'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { LinkItem } from '@/data/links';
import { useLocale } from '@/i18n/LocaleProvider';

type Props = {
  item: LinkItem;
  index: number;
};

export function LinkCard({ item, index }: Props) {
  const { t } = useLocale();
  const isInternal = item.url.startsWith('/');
  const label = t(item.labelKey);
  const animationStyle: CSSProperties & Record<string, string | number> = {
    '--i': index,
  };

  // Visual style per variant. WhatsApp uses dark text on brand green so the
  // CTA passes WCAG AA (white on #25D366 was 1.98:1, fails AA). Brand icon
  // is monochrome black from simpleicons — invert to white in the dark-text
  // variant so it stays legible against the green fill.
  const toneClass = item.highlight
    ? 'bg-accent text-secondary border-transparent hover:bg-accent/90 focus-visible:bg-accent/90'
    : item.whatsapp
      ? 'bg-[#25D366] text-secondary border-transparent hover:bg-[#1ebe57] focus-visible:bg-[#1ebe57]'
      : 'bg-white dark:bg-[#25201c] text-secondary dark:text-[#F8F5F4] border-black/10 dark:border-white/10 hover:border-accent/40 hover:bg-accent/[0.02] focus-visible:border-accent/60';

  const iconBgClass = item.highlight
    ? 'bg-secondary/10'
    : item.whatsapp
      ? 'bg-secondary/15'
      : 'bg-accent/8 dark:bg-accent/15';

  const iconFilter = item.highlight
    ? ''
    : item.whatsapp
      ? '[filter:brightness(0)_invert(1)]' // invert black SVG → white on green
      : '';

  const arrowClass = item.highlight || item.whatsapp
    ? 'opacity-70'
    : 'opacity-40';

  const inner = (
    <>
      <span
        className={
          'inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 overflow-hidden ' +
          iconBgClass
        }
      >
        {item.icon.kind === 'img' ? (
          // Brand icon (SVG/PNG from /public). simpleicons SVGs ship as
          // monochrome black, so the whatsapp variant inverts them so they
          // stay legible against the green fill.
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.icon.src}
            alt={item.icon.alt ?? label}
            width={24}
            height={24}
            className={`w-6 h-6 object-contain ${iconFilter}`}
          />
        ) : (
          <item.icon.Icon className="w-5 h-5 text-accent" aria-hidden="true" />
        )}
      </span>
      <span className="font-medium text-[15px] tracking-tight">{label}</span>
      <svg
        className={`ml-auto w-4 h-4 ${arrowClass} transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-80`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    </>
  );

  const className =
    'fade-up group flex items-center gap-3 w-full min-h-[60px] px-5 ' +
    'rounded-2xl border transition-[transform,box-shadow,background-color,border-color] duration-200 ' +
    'ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-md ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-background dark:focus-visible:ring-offset-[#15110d] ' +
    toneClass;

  if (isInternal) {
    return (
      <Link
        href={item.url}
        aria-label={label}
        prefetch
        className={className}
        style={animationStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
      style={animationStyle}
    >
      {inner}
    </a>
  );
}