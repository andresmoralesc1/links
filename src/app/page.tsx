import { Hero } from '@/components/Hero';
import { LinkList } from '@/components/LinkList';
import { ParticlesBackground } from '@/components/ParticlesBackground';

export default function Page() {
  return (
    <div className="relative">
      <ParticlesBackground id="allmylinks-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[480px] px-8 pt-12 pb-16 md:px-12 md:pt-16">
        <Hero />
        <LinkList />
        <footer className="mt-12 text-center text-xs text-secondary/40">
          Hecho con ❤ en Colombia
        </footer>
      </main>
    </div>
  );
}
