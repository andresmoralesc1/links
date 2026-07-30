import { ImageResponse } from 'next/og';
import { profile } from '@/data/links';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${profile.name} — Links`;

export default async function OpengraphImage() {
  let interSemiBold: ArrayBuffer | undefined;
  let interRegular: ArrayBuffer | undefined;
  try {
    interSemiBold = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf'),
    ).then((r) => r.arrayBuffer());
    interRegular = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg.ttf'),
    ).then((r) => r.arrayBuffer());
  } catch {
    /* fall through to default */
  }

  const fonts = interSemiBold && interRegular
    ? [
        { name: 'Inter', data: interSemiBold, weight: 600 as const, style: 'normal' as const },
        { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
      ]
    : undefined;

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
          backgroundColor: '#1E1810',
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(249,110,3,0.30) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(75,79,88,0.30) 0%, transparent 60%)',
          color: '#fff',
          fontFamily: fonts ? 'Inter' : 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.6, marginBottom: 8, fontWeight: 400 }}>
          @{profile.name.split(' ')[0].toLowerCase()}
        </div>
        <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 24, maxWidth: 900, opacity: 0.85, fontWeight: 400 }}>
          {profile.bio}
        </div>
        <div style={{ position: 'absolute', bottom: 60, right: 80, fontSize: 28, opacity: 0.5 }}>
          allmylinks.andresmorales.com.co
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
