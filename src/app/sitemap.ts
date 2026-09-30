import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://links.andresmorales.com.co';
  const now = new Date();
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      // English default + Spanish alternate (locale is cookie-driven client-side,
      // not URL-based — hreflang not applicable).
      alternates: {
        languages: {
          es: base,
          en: base,
          pt: base,
        },
      },
    },
    // /brief intentionally excluded — private intake form, noindex.
  ];
}