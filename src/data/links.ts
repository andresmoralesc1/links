import {
  Cat,
  Globe,
  Mail,
  NotebookPen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { MessageKey } from '@/i18n/messages';

/**
 * Each link is rendered with one of two icon sources:
 * - `icon.kind === 'img'` — a public file under /brands or /icons. Used for
 *   brand marks where we have the asset (Portfolio, Barriotech, n8n, etc.).
 * - `icon.kind === 'lucide'` — a lucide-react component. Used as a fallback
 *   when we don't have a brand mark (e.g. Cat glyph for El Gato Colectivo,
 *   envelope for Email).
 *
 * External URLs carry `?utm_source=linkinbio` so analytics can attribute
 * clicks back to the QR scan / social bio. The brief route (/brief) is
 * internal so it has no UTM — mailto: likewise, since mail clients ignore
 * query params.
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
  nameKey: MessageKey;
  bioKey: MessageKey;
  avatar: string;
};

export type LinkItem = {
  labelKey: MessageKey;
  url: string;
  icon: LinkIcon;
  highlight?: boolean;
  whatsapp?: boolean;
};

const UTM = '?utm_source=linkinbio';

export const profile: Profile = {
  nameKey: 'profileName',
  bioKey: 'bio',
  avatar: '/avatar.jpg',
};

export const links: LinkItem[] = [
  {
    labelKey: 'whatsappLabel',
    url: `https://wa.me/573245425387?text=Hola%20Andr%C3%A9s%2C%20vi%20tu%20QR%20y...${UTM}`,
    icon: { kind: 'img', src: '/brands/whatsapp.svg', alt: 'WhatsApp' },
    whatsapp: true,
  },
  {
    labelKey: 'landingLabel',
    url: `https://andresmorales.com.co${UTM}`,
    icon: { kind: 'lucide', Icon: Globe },
  },
  {
    labelKey: 'briefLabel',
    url: '/brief',
    icon: { kind: 'lucide', Icon: NotebookPen },
    highlight: true,
  },
  {
    labelKey: 'portfolioLabel',
    url: `https://andresmorales.com.co/portfolio${UTM}`,
    icon: { kind: 'img', src: '/brands/portfolio.png', alt: 'Portafolio' },
  },
  {
    labelKey: 'gatoLabel',
    url: `https://gato.andresmorales.com.co${UTM}`,
    icon: { kind: 'lucide', Icon: Cat },
  },
  {
    labelKey: 'barriotechLabel',
    url: `https://barriotech.com.co${UTM}`,
    icon: { kind: 'img', src: '/brands/barriotech.png', alt: 'Barriotech' },
  },
  {
    labelKey: 'linkedinLabel',
    url: `https://www.linkedin.com/in/andresmoralesc1/${UTM}`,
    icon: { kind: 'img', src: '/brands/linkedin.svg', alt: 'LinkedIn' },
  },
  {
    labelKey: 'emailLabel',
    url: 'mailto:info@andresmorales.com.co',
    icon: { kind: 'lucide', Icon: Mail },
  },
  {
    labelKey: 'instagramLabel',
    url: `https://www.instagram.com/andres_morales_automation${UTM}`,
    icon: { kind: 'img', src: '/brands/instagram.svg', alt: 'Instagram' },
  },
  {
    labelKey: 'facebookLabel',
    url: `https://www.facebook.com/andresmoralesautomation${UTM}`,
    icon: { kind: 'img', src: '/brands/facebook.svg', alt: 'Facebook' },
  },
];