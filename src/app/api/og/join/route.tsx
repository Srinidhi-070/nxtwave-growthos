import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const colorMap: Record<string, string> = {
  black: '#111827', brown: '#78350f', blonde: '#fef3c7', red: '#991b1b',
  pink: '#f472b6', blue: '#3ef2ff', green: '#b6ff3b', purple: '#a855f7',
  white: '#f9fafb', gray: '#6b7280'
};

const outfitColorMap: Record<string, { main: string; accent: string }> = {
  explorer: { main: '#3b82f6', accent: '#1d4ed8' },
  hacker: { main: '#10b981', accent: '#047857' },
  stealth: { main: '#111827', accent: '#374151' },
  neon: { main: '#f472b6', accent: '#db2777' },
  cyber: { main: '#8b5cf6', accent: '#6d28d9' }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const referralId = searchParams.get('id')?.toUpperCase() || 'GUEST';
    
    // Find character by displayName (since referral ID is usually the name without spaces)
    // Try to find exact match or partial
    let character = null;
    try {
      character = await prisma.character.findFirst({
        where: { displayName: { contains: referralId, mode: 'insensitive' } }
      });
    } catch(e) {
      console.warn("OG Route: DB offline, using default char");
    }

    const config = character ? {
      body: character.body,
      face: character.face,
      hair: character.hair,
      hairColor: character.hairColor,
      outfit: character.outfit,
      accessory: character.accessory
    } : {
      body: 'base',
      face: 'default',
      hair: 'spiky',
      hairColor: 'blue',
      outfit: 'explorer',
      accessory: 'none'
    };

    const outfitData = outfitColorMap[config.outfit] || outfitColorMap.explorer;
    const skinColor = config.body === 'slim' ? '#fcd34d' : config.body === 'heavy' ? '#8b5cf6' : '#fca5a5';
    const hairColorHex = colorMap[config.hairColor] || colorMap.blue;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050314', // void
            fontFamily: 'monospace',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1543 0%, #050314 100%)',
          }}
        >
          {/* Card Border */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '1000px',
              height: '500px',
              border: '4px solid #3ef2ff', // cyan
              backgroundColor: '#0a0820', // deep
              position: 'relative',
              boxShadow: '0 0 40px rgba(62,242,255,0.2)',
            }}
          >
            {/* Left side: Character SVG */}
            <div
              style={{
                display: 'flex',
                width: '400px',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '2px solid rgba(62,242,255,0.3)',
                backgroundColor: 'rgba(62,242,255,0.05)',
              }}
            >
              <svg viewBox="0 0 100 100" width="300" height="300" style={{ shapeRendering: 'crispEdges' }}>
                {/* Accessory Tail */}
                {(config.accessory === 'tail' || config.accessory === 'none') && (
                  <path d="M 25 70 L 15 70 L 15 65 L 10 65 L 10 60 L 5 60 L 5 65 L 10 65 L 10 75 L 25 75 Z" fill="#ffffff" />
                )}
                {/* LEGS/BOOTS */}
                <rect x="35" y="80" width="12" height="8" fill={outfitData.accent} />
                <rect x="53" y="80" width="12" height="8" fill={outfitData.accent} />
                <rect x="35" y="88" width="14" height="6" fill="#111827" />
                <rect x="51" y="88" width="14" height="6" fill="#111827" />
                
                {/* BODY */}
                <path d="M 30 50 L 70 50 L 75 75 L 25 75 Z" fill={outfitData.main} />
                <rect x="40" y="50" width="20" height="25" fill={outfitData.accent} />

                {/* HEAD */}
                <rect x="30" y="20" width="40" height="30" fill={skinColor} />
                
                {/* EYES */}
                <rect x="38" y="30" width="6" height="6" fill="#000000" />
                <rect x="56" y="30" width="6" height="6" fill="#000000" />

                {/* MOUTH */}
                <rect x="44" y="42" width="12" height="2" fill="#000000" />

                {/* HAIR */}
                {config.hair !== 'bald' && (
                  <path d="M 25 25 L 30 15 L 40 10 L 60 10 L 70 15 L 75 25 L 70 20 L 60 15 L 40 15 L 30 20 Z" fill={hairColorHex} />
                )}
              </svg>
            </div>

            {/* Right side: Text Data */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                flex: 1,
              }}
            >
              <div style={{ display: 'flex', color: '#3ef2ff', fontSize: 24, letterSpacing: '4px', marginBottom: '20px' }}>
                SYSTEM // SECURE UPLINK
              </div>
              
              <div style={{ display: 'flex', color: '#ffffff', fontSize: 64, fontWeight: 'bold', marginBottom: '10px' }}>
                CREW INVITE
              </div>

              <div style={{ display: 'flex', color: '#b6ff3b', fontSize: 48, fontWeight: 'bold', marginBottom: '40px', borderBottom: '2px solid rgba(182,255,59,0.3)', paddingBottom: '20px' }}>
                {referralId}
              </div>

              <div style={{ display: 'flex', color: '#828eaf', fontSize: 28, lineHeight: 1.5 }}>
                Initialize your explorer and join the AI deployment workshop.
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Error", e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
