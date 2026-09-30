import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { cookies } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { messages, defaultLocale, isLocale } from '@/i18n/messages';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// Analytics: opt-in via env vars. Set these in Vercel → Project Settings →
// Environment Variables to activate.
//   NEXT_PUBLIC_GA_ID                       → Google Analytics 4 measurement ID
//   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION   → Google Search Console verification token
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

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
  robots: {
    index: true,
    follow: true,
    // /brief is a private form — noindex it explicitly so Google doesn't try to crawl.
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Console verification. Get the token from
  // search.google.com/search-console → Property → Settings → Ownership
  // verification → HTML tag, then paste it into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const cookieLocale = store.get('links.locale')?.value;
  const lang = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  return (
    <html lang={lang} className={inter.variable}>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <Analytics />
        {/* GA4 — only renders when NEXT_PUBLIC_GA_ID is set. next/script
            with strategy="afterInteractive" avoids blocking first paint
            (critical on QR-scan mobile). */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}