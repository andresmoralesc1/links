import {
  Cat,
  Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Each link is rendered with one of two icon sources:
 * - `icon.kind === 'img'` — a public file under /brands or /icons. Used for
 *   brand marks where we have the asset (Portfolio, Barriotech, n8n, etc.).
 * - `icon.kind === 'lucide'` — a lucide-react component. Used as a fallback
 *   when we don't have a brand mark (e.g. Cat glyph for El Gato Colectivo,
 *   envelope for Email).
 */
export type BrandIcon = {
  kind: 'img';
  src: string;
  alt?: string;
};

export type LucideIconRef = {
  kind: 'lucide';
  Icon: LucideIcon;
};

export type LinkIcon = BrandIcon | LucideIconRef;

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
};

export type LinkItem = {
  label: string;
  url: string;
  icon: LinkIcon;
  highlight?: boolean;
};

export const profile: Profile = {
  name: 'Andrés Morales',
  bio: 'Desarrollador & emprendedor digital',
  avatar: '/avatar.jpg',
};

export const links: LinkItem[] = [
  {
    label: 'Portafolio',
    url: 'https://andresmorales.com.co',
    icon: { kind: 'img', src: '/brands/portfolio.png', alt: 'Andrés Morales' },
    highlight: true,
  },
  {
    label: 'El Gato Colectivo',
    url: 'https://gato.andresmorales.com.co',
    icon: { kind: 'lucide', Icon: Cat },
  },
  {
    label: 'Barriotech',
    url: 'https://barriotech.com.co',
    icon: { kind: 'img', src: '/brands/barriotech.png', alt: 'Barriotech' },
  },
  {
    label: 'Automatizaciones',
    url: 'https://n8n.andresmorales.com.co',
    icon: { kind: 'img', src: '/brands/n8n.svg', alt: 'n8n' },
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/andresmoralesc1/',
    icon: { kind: 'img', src: '/brands/linkedin.svg', alt: 'LinkedIn' },
  },
  {
    label: 'WhatsApp',
    url: 'https://wa.me/573245425387',
    icon: { kind: 'img', src: '/brands/whatsapp.svg', alt: 'WhatsApp' },
  },
  {
    label: 'Email',
    url: 'mailto:info@andresmorales.com.co',
    icon: { kind: 'lucide', Icon: Mail },
  },
];
