import {
  Briefcase,
  ShoppingBag,
  MapPin,
  Workflow,
  Linkedin,
  MessageCircle,
  Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
};

export type LinkItem = {
  label: string;
  url: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export const profile: Profile = {
  name: 'Andrés Morales',
  bio: 'Desarrollador & emprendedor digital',
  avatar: '/avatar.jpg',
};

export const links: LinkItem[] = [
  { label: 'Portafolio',       url: 'https://andresmorales.com.co',                 icon: Briefcase,    highlight: true  },
  { label: 'Tienda MECCA',     url: 'https://shop.andresmorales.com.co',            icon: ShoppingBag                     },
  { label: 'Barriotech',       url: 'https://barriotech.com.co',                    icon: MapPin                          },
  { label: 'Automatizaciones', url: 'https://n8n.andresmorales.com.co',             icon: Workflow                        },
  { label: 'LinkedIn',         url: 'https://www.linkedin.com/in/andresmoralesc1/', icon: Linkedin                        },
  { label: 'WhatsApp',         url: 'https://wa.me/573245425387',                   icon: MessageCircle                   },
  { label: 'Email',            url: 'mailto:info@andresmorales.com.co',             icon: Mail                            },
];
