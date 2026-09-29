import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { messages, defaultLocale } from '@/i18n/messages';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://links.andresmorales.com.co'),
  title: `${messages[defaultLocale].profileName} — Links`,
  description: messages[defaultLocale].bio,
  applicationName: messages[defaultLocale].profileName,
  openGraph: {
    type: 'website',
    title: `${messages[defaultLocale].profileName} — Links`,
    description: messages[defaultLocale].bio,
    siteName: messages[defaultLocale].profileName,
    locale: 'es_CO',
    url: 'https://links.andresmorales.com.co',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: messages[defaultLocale].profileName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${messages[defaultLocale].profileName} — Links`,
    description: messages[defaultLocale].bio,
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
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
