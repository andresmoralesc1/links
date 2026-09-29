'use client';

import { useEffect, useState } from 'react';

/*
  ParticlesBackground — orange ambient particles decoration.

  "soft" variant — 60 particles, opacity 0.15–0.35, no hover, disabled on
  viewports < `disableBelow` so the background reads as ambient texture on
  the link-in-bio card without competing with the AVATAR and the link list.
  On mobile the script is never loaded — matchMedia check gates the fetch.
*/

type Variant = 'dark' | 'cream' | 'soft';

type Props = {
  id?: string;
  variant?: Variant;
  disableBelow?: number;
};

export function ParticlesBackground({
  id = 'allmylinks-particles',
  variant = 'soft',
  disableBelow = 768,
}: Props) {
  // Default true (server renders placeholder div). On client mount we check
  // the media query: if viewports < disableBelow, set to false and never
  // load the particles script. Saves ~30KB JS parse on every mobile visit.
  const [shouldRun, setShouldRun] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(min-width: ${disableBelow}px)`);
    setShouldRun(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setShouldRun(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [disableBelow]);

  useEffect(() => {
    if (!shouldRun) return;

    let mounted = true;

    const ensureParticlesLib = (): Promise<void> =>
      new Promise((resolve) => {
        if (typeof window !== 'undefined' && (window as unknown as { particlesJS?: unknown }).particlesJS) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = '/scripts/particles.min.js';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

    let opacityMin: number;
    let opacityMax: number;
    let sizeMin: number;
    let sizeMax: number;
    let particleCount: number;
    let enableHover: boolean;

    switch (variant) {
      case 'soft':
        opacityMin = 0.15;
        opacityMax = 0.35;
        sizeMin = 2;
        sizeMax = 4;
        particleCount = 60;
        enableHover = false;
        break;
      case 'cream':
        opacityMin = 0.3;
        opacityMax = 0.7;
        sizeMin = 3;
        sizeMax = 6;
        particleCount = 90;
        enableHover = true;
        break;
      case 'dark':
      default:
        opacityMin = 0.3;
        opacityMax = 0.75;
        sizeMin = 2;
        sizeMax = 5;
        particleCount = 160;
        enableHover = true;
        break;
    }

    ensureParticlesLib().then(() => {
      if (!mounted) return;
      const target = document.getElementById(id);
      if (!target) return;

      (window as unknown as { particlesJS: (id: string, opts: unknown) => void }).particlesJS(id, {
        particles: {
          number: { value: particleCount, density: { enable: true, value_area: 900 } },
          color: { value: '#f96e03' },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
          opacity: {
            value: opacityMax,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: opacityMin, sync: false },
          },
          size: {
            value: (sizeMin + sizeMax) / 2,
            random: true,
            anim: { enable: false, speed: 4, size_min: sizeMin, sync: false },
          },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 600 },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: enableHover, mode: 'bubble' },
            onclick: { enable: enableHover, mode: 'repulse' },
            resize: true,
          },
          modes: enableHover
            ? {
                bubble: { distance: 250, size: 8, duration: 2, opacity: 1, speed: 3 },
                repulse: { distance: 400, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              }
            : {},
        },
        retina_detect: true,
      });
    });

    return () => {
      mounted = false;
    };
  }, [id, variant, shouldRun]);

  // Hide the canvas placeholder entirely on viewports where particles won't run.
  // Use a CSS media query (no JS needed) so the element never paints at all on
  // mobile — avoids the brief moment where the bg div is visible before
  // shouldRun flips to false.
  return (
    <div
      id={id}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
    />
  );
}