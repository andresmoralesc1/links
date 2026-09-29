'use client';

import { Hero } from '@/components/Hero';
import { LinkList } from '@/components/LinkList';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { useLocale } from '@/i18n/LocaleProvider';

export default function Page() {
  const { t } = useLocale();
  return (
    <div className="relative">
      <ParticlesBackground id="links-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[480px] px-8 pt-12 pb-16 md:px-12 md:pt-16">
        <Hero />
        <LinkList />
        <LocaleSwitcher />
        <footer className="mt-3 text-center text-xs text-secondary/40">
          {t('footer')}
        </footer>
      </main>
    </div>
  );
}
