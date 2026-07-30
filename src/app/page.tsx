import { Hero } from '@/components/Hero';
import { LinkList } from '@/components/LinkList';

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-[480px] px-8 pt-12 pb-16 md:px-12 md:pt-16">
      <Hero />
      <LinkList />
      <footer className="mt-12 text-center text-xs text-primary/40">
        Hecho con ❤ en Colombia
      </footer>
    </main>
  );
}
