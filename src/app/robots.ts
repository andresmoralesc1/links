import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/brief'],
      },
      // Explicit per-bot override (Google inherits '*' rule but be defensive).
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/brief'],
      },
    ],
    sitemap: 'https://links.andresmorales.com.co/sitemap.xml',
    host: 'https://links.andresmorales.com.co',
  };
}