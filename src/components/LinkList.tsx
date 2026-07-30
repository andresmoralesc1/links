import { links } from '@/data/links';
import { LinkCard } from './LinkCard';

export function LinkList() {
  return (
    <nav
      aria-label="Enlaces de Andrés Morales"
      className="flex flex-col gap-3 w-full"
    >
      {links.map((item, i) => (
        <LinkCard key={item.url} item={item} index={i} />
      ))}
    </nav>
  );
}
