import type { LinkItem } from '@/data/links';
import type { CSSProperties } from 'react';

type Props = {
  item: LinkItem;
  index: number;
};

export function LinkCard({ item, index }: Props) {
  const Icon = item.icon;
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
        'fade-up group flex items-center gap-3 w-full min-h-[56px] px-5 ' +
        'rounded-2xl border transition-[transform,box-shadow,background-color] duration-200 ' +
        'ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-lg ' +
        (item.highlight
          ? 'bg-accent text-secondary border-transparent hover:bg-accent/90'
          : 'bg-white/5 text-primary border-white/10 hover:bg-white/10')
      }
      style={animationStyle}
    >
      <span
        className={
          'inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ' +
          (item.highlight ? 'bg-black/15' : 'bg-accent/15 text-accent')
        }
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <span className="font-medium text-[15px] tracking-tight">{item.label}</span>
      <svg
        className="ml-auto w-4 h-4 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5"
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
