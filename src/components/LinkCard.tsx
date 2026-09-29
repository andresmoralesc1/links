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
  // Highlight = primary conversion CTA. Kept on a white card (per design
  // preference) with an accent ring + shadow to differentiate it from the
  // default cards and from the WhatsApp green fill above.
  const toneClass = item.highlight
    ? 'bg-white dark:bg-[#25201c] text-secondary dark:text-[#F8F5F4] border-2 border-accent ' +
      'shadow-[0_4px_14px_-4px_rgba(249,110,3,0.35)] ' +
      'hover:shadow-[0_8px_20px_-4px_rgba(249,110,3,0.55)] hover:bg-accent/[0.04] ' +
      'focus-visible:bg-accent/[0.04]'
    : item.whatsapp
      ? 'bg-[#25D366] text-secondary border-transparent hover:bg-[#1ebe57] focus-visible:bg-[#1ebe57]'
      : 'bg-white dark:bg-[#25201c] text-secondary dark:text-[#F8F5F4] border-black/10 dark:border-white/10 hover:border-accent/40 hover:bg-accent/[0.02] focus-visible:border-accent/60';

  // Icon container color: subtle, theme-aware. WhatsApp gets a white inner
  // "app icon" style so the colored logo reads cleanly. Highlight gets an
  // accent-tinted container that pairs with the orange border ring.
  // Default cards get a soft gray that flatters both monochrome and
  // colored brand icons.
  const iconBgClass = item.highlight
    ? 'bg-accent/12 dark:bg-accent/20'
    : item.whatsapp
      ? 'bg-white'
      : 'bg-black/[0.04] dark:bg-white/[0.04]';

  // No color filters — all brand icons (whatsapp, linkedin, facebook,
  // instagram, barriotech, gato) ship as colored assets that should
  // render as-is. The previous invert trick was a hack for monochrome
  // simpleicons; we now use the proper colored variants.
  const iconFilter = '';

  const arrowClass = item.highlight
    ? 'opacity-80'
    : item.whatsapp
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
          // stay legible against the green fill. Highlight stays default.
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.icon.src}
            alt={item.icon.alt ?? label}
            width={24}
            height={24}
            className={`w-6 h-6 object-contain ${iconFilter}`}
          />
        ) : (
          <item.icon.Icon
            className={
              item.highlight
                ? 'w-5 h-5 text-accent'
                : 'w-5 h-5 text-accent'
            }
            aria-hidden="true"
          />
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