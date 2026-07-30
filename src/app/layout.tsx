import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { profile } from '@/data/links';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://allmylinks.andresmorales.com.co'),
  title: `${profile.name} — Links`,
  description: profile.bio,
  applicationName: profile.name,
  openGraph: {
    type: 'website',
    title: `${profile.name} — Links`,
    description: profile.bio,
    siteName: profile.name,
    locale: 'es_CO',
    url: 'https://allmylinks.andresmorales.com.co',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Links`,
    description: profile.bio,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/avatar.jpg',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
