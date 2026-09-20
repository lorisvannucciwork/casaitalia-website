import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Casa Italia Ristorante - Authentic Italian Restaurant in Porto Ghalib Marina, Red Sea';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1816 0%, #2a2520 40%, #1a1816 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >

        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '2px solid rgba(186, 147, 90, 0.4)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '28px',
            left: '28px',
            right: '28px',
            bottom: '28px',
            border: '1px solid rgba(186, 147, 90, 0.2)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(186, 147, 90, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '60px',
          }}
        >

          <div
            style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #ba935a, transparent)',
              display: 'flex',
            }}
          />

          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#faf7f2',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              textAlign: 'center',
              display: 'flex',
            }}
          >
            Casa Italia
          </div>

          <div
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#ba935a',
              letterSpacing: '8px',
              textTransform: 'uppercase' as const,
              display: 'flex',
            }}
          >
            RISTORANTE
          </div>

          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #ba935a, transparent)',
              display: 'flex',
            }}
          />

          <div
            style={{
              fontSize: '20px',
              fontWeight: 400,
              color: '#d4cbbe',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.6,
              display: 'flex',
            }}
          >
            Authentic Italian Cuisine at Porto Ghalib Marina
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#ba935a',
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                display: 'flex',
              }}
            >
              ★ Porto Ghalib Marina • Red Sea • Egypt ★
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '8px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#8c8479',
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                display: 'flex',
              }}
            >
              Wood-Fired Pizza • Fresh Pasta • Seafood • Fine Wines
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
