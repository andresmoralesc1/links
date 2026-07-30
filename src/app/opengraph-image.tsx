import { ImageResponse } from 'next/og';
import { profile } from '@/data/links';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${profile.name} — Links`;

export default async function OpengraphImage() {
  // Inter font fetch disabled: the gstatic CDN URL hash used here (v18) now
  // returns HTML (404 page) and crashes satori with "Unsupported OpenType
  // signature". The page body uses next/font which handles Inter cleanly; the
  // OG image accepts the OS sans-serif fallback to keep the route stable.
  const fonts = undefined;

  const handle = profile.name.split(' ')[0].toLowerCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          backgroundColor: '#F8F5F4',
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(249,110,3,0.20) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(75,79,88,0.10) 0%, transparent 60%)',
          color: '#1E1810',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 96,
            height: 96,
            borderRadius: 9999,
            border: '2px solid #f96e03',
            backgroundColor: '#fff',
            marginBottom: 32,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          {profile.name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </div>
        <div style={{ display: 'flex', fontSize: 32, opacity: 0.55, marginBottom: 8, fontWeight: 400 }}>
          @{handle}
        </div>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          {profile.name}
        </div>
        <div style={{ display: 'flex', fontSize: 36, marginTop: 24, maxWidth: 900, opacity: 0.75, fontWeight: 400 }}>
          {profile.bio}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            marginTop: 40,
            padding: '8px 16px',
            borderRadius: 9999,
            backgroundColor: '#f96e03',
            color: '#1E1810',
            fontWeight: 600,
          }}
        >
          allmylinks.andresmorales.com.co
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
