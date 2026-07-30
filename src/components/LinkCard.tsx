import type { LinkItem } from '@/data/links';
import type { CSSProperties } from 'react';

type Props = {
  item: LinkItem;
  index: number;
};

export function LinkCard({ item, index }: Props) {
  const isExternal = item.url.startsWith('http');
  const animationStyle: CSSProperties & Record<string, string | number> = {
    '--i': index,
  };

  return (
    <a
      href={item.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className={
        'fade-up group flex items-center gap-3 w-full min-h-[60px] px-5 ' +
        'rounded-2xl border transition-[transform,box-shadow,background-color,border-color] duration-200 ' +
        'ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-md ' +
        (item.highlight
          ? 'bg-accent text-secondary border-transparent hover:bg-accent/90'
          : 'bg-white text-secondary border-black/10 hover:border-accent/40 hover:bg-accent/[0.02]')
      }
      style={animationStyle}
    >
      <span
        className={
          'inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 overflow-hidden ' +
          (item.highlight ? 'bg-secondary/10' : 'bg-accent/8')
        }
      >
        {item.icon.kind === 'img' ? (
          /* Brand icon (SVG/PNG from /public). Sized to fill the rounded
             background. The simpleicons SVGs ship as monochrome black, so on
             the default white card they render legible; on the highlight
             card the dark inner bg keeps them visible. */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.icon.src}
            alt={item.icon.alt ?? item.label}
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <item.icon.Icon className="w-5 h-5 text-accent" aria-hidden="true" />
        )}
      </span>
      <span className="font-medium text-[15px] tracking-tight">{item.label}</span>
      <svg
        className="ml-auto w-4 h-4 opacity-40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-80"
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
    </a>
  );
}
