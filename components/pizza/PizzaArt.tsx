import React from 'react';

/* Drawn parts of the pizza builder: the gloved hand (cursor), the print of the box lid in the
   Casa Italia colours, the kitchen timer and the receipt's barcode. */

const GOLD = '#ba935a';
const GOLD_DEEP = '#8c6c39';

// ---------------------------------------------------------------------------------------------
// Black nitrile glove: three poses, drawn from rounded "capsules" with a glossy light from the
// top left. The hot spot is the tip of the index finger (top left of the box).
// ---------------------------------------------------------------------------------------------
function Capsule({ x, y, length, width, angle }: { x: number; y: number; length: number; width: number; angle: number }) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <rect x={x - width / 2} y={y - length} width={width} height={length + width / 2} rx={width / 2} fill="url(#glove-skin)" />
      <rect x={x - width / 2 + 2.5} y={y - length + 4} width={width * 0.28} height={length * 0.62} rx={width * 0.14} fill="#ffffff" opacity="0.16" />
      <path d={`M${x - width / 2 + 2} ${y - length * 0.45} q ${width / 2 - 2} 3 ${width - 4} 0`} stroke="#56565e" strokeWidth="1" fill="none" opacity="0.55" />
    </g>
  );
}

function GloveDefs() {
  return (
    <defs>
      <linearGradient id="glove-skin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4a4a52" />
        <stop offset="0.45" stopColor="#1d1d22" />
        <stop offset="1" stopColor="#09090b" />
      </linearGradient>
      <radialGradient id="glove-palm" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#45454d" />
        <stop offset="0.6" stopColor="#18181c" />
        <stop offset="1" stopColor="#08080a" />
      </radialGradient>
      <filter id="glove-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="5" dy="8" stdDeviation="5" floodColor="#1a1208" floodOpacity="0.38" />
      </filter>
    </defs>
  );
}

function Cuff() {
  return (
    <g>
      <path d="M44 96 C 50 118, 78 124, 92 112 L 96 128 L 58 134 Z" fill="url(#glove-skin)" />
      <path d="M46 104 C 58 116, 80 118, 92 110" stroke="#5a5a62" strokeWidth="1.2" fill="none" opacity="0.6" />
    </g>
  );
}

export type GlovePose = 'open' | 'point' | 'ok' | 'grab';

export function Glove({ pose }: { pose: GlovePose }) {
  return (
    <svg viewBox="0 0 130 140" width="100%" height="100%" aria-hidden="true">
      <GloveDefs />
      <g filter="url(#glove-shadow)">
        <Cuff />
        {pose === 'point' && (
          <>
            <rect x="34" y="48" width="54" height="56" rx="20" fill="url(#glove-palm)" />
            <Capsule x={46} y={58} length={52} width={17} angle={-6} />
            <ellipse cx="66" cy="54" rx="11" ry="8.5" fill="url(#glove-skin)" />
            <ellipse cx="80" cy="60" rx="9.5" ry="8" fill="url(#glove-skin)" />
            <ellipse cx="86" cy="74" rx="8" ry="7" fill="url(#glove-skin)" />
            <Capsule x={42} y={86} length={30} width={16} angle={-58} />
          </>
        )}
        {(pose === 'open' || pose === 'grab') && (
          <>
            <rect x="34" y="52" width="54" height="50" rx="20" fill="url(#glove-palm)" />
            <Capsule x={42} y={60} length={pose === 'grab' ? 24 : 38} width={14} angle={-16} />
            <Capsule x={56} y={56} length={pose === 'grab' ? 26 : 44} width={14.5} angle={-4} />
            <Capsule x={70} y={57} length={pose === 'grab' ? 25 : 42} width={14} angle={7} />
            <Capsule x={82} y={64} length={pose === 'grab' ? 20 : 33} width={12.5} angle={19} />
            <Capsule x={38} y={86} length={30} width={16} angle={-62} />
          </>
        )}
        {pose === 'ok' && (
          <>
            <rect x="38" y="54" width="52" height="50" rx="20" fill="url(#glove-palm)" />
            <Capsule x={62} y={58} length={42} width={14.5} angle={-2} />
            <Capsule x={75} y={60} length={39} width={14} angle={9} />
            <Capsule x={86} y={67} length={31} width={12.5} angle={20} />
            <circle cx="36" cy="58" r="12" fill="none" stroke="url(#glove-skin)" strokeWidth="12" />
            <path d="M28 50 a 12 12 0 0 1 14 -3" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.18" />
          </>
        )}
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Box lid print: Casa Italia logo and gold line drawings (basil, tomato, olive branch, a slice)
// ---------------------------------------------------------------------------------------------
function BasilSprig({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  const leaf = 'M0 0 C 18 -22, 48 -24, 66 -6 C 46 8, 18 10, 0 0 Z';
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} stroke={GOLD} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0 C 30 -40, 50 -90, 52 -150" />
      {[
        [8, -18, -38],
        [22, -50, 28],
        [34, -82, -48],
        [44, -112, 22],
        [50, -140, -70],
      ].map(([lx, ly, r], i) => (
        <g key={i} transform={`translate(${lx} ${ly}) rotate(${r})`}>
          <path d={leaf} />
          <path d="M6 -1 C 24 -6, 42 -7, 58 -5" strokeWidth="1.8" />
        </g>
      ))}
    </g>
  );
}

function Tomato({ x, y, r = 46 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={GOLD} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${-r} 4 C ${-r} ${-r * 0.8}, ${r} ${-r * 0.8}, ${r} 4 C ${r} ${r * 1.05}, ${-r} ${r * 1.05}, ${-r} 4 Z`} />
      <path d={`M${-r * 0.55} ${-r * 0.1} C ${-r * 0.4} ${r * 0.5}, ${-r * 0.1} ${r * 0.75}, ${r * 0.15} ${r * 0.8}`} strokeWidth="2" opacity="0.7" />
      <path d="M0 -26 L -16 -40 M0 -26 L 16 -42 M0 -26 L -22 -24 M0 -26 L 22 -22 M0 -26 L 2 -48" strokeWidth="3" />
    </g>
  );
}

function OliveBranch({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M0 0 C 40 -10, 90 -10, 140 -2" />
      {[20, 48, 76, 104].map((lx, i) => (
        <g key={i}>
          <path d={`M${lx} -4 C ${lx + 8} -22, ${lx + 26} -28, ${lx + 34} -26 C ${lx + 30} -14, ${lx + 16} -6, ${lx} -4 Z`} />
          <path d={`M${lx + 6} -2 C ${lx + 14} 14, ${lx + 30} 20, ${lx + 38} 16 C ${lx + 32} 6, ${lx + 18} 0, ${lx + 6} -2 Z`} />
        </g>
      ))}
      <ellipse cx="148" cy="8" rx="9" ry="12" transform="rotate(-20 148 8)" />
      <ellipse cx="128" cy="16" rx="8" ry="11" transform="rotate(10 128 16)" />
    </g>
  );
}

function Slice({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} stroke={GOLD} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0 L 130 -40 C 136 -22, 136 -4, 130 14 Z" />
      <path d="M118 -32 C 124 -18, 124 0, 118 12" strokeWidth="2.2" />
      <circle cx="52" cy="-6" r="10" />
      <circle cx="86" cy="-18" r="9" />
      <circle cx="94" cy="4" r="7" />
      <path d="M30 2 C 32 14, 28 22, 30 30 M70 8 C 72 20, 68 26, 70 34" strokeWidth="2.4" />
    </g>
  );
}

function Sparkles({ points }: { points: [number, number][] }) {
  return (
    <g fill={GOLD}>
      {points.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={i % 3 === 0 ? 4 : 2.6} opacity={0.85} />
      ))}
    </g>
  );
}

export function LidPrint({ startLabel, ovenLabel }: { startLabel: string; ovenLabel: string }) {
  return (
    <svg viewBox="0 0 1000 1000" width="100%" height="100%" aria-hidden="true">
      {/* thin gold frame */}
      <rect x="64" y="64" width="872" height="872" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.55" />
      <rect x="78" y="78" width="844" height="844" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      {/* dough being tossed */}
      <g stroke={GOLD} strokeWidth="3.2" fill="none" strokeLinecap="round" opacity="0.95">
        <ellipse cx="500" cy="188" rx="112" ry="34" />
        <ellipse cx="500" cy="186" rx="82" ry="20" strokeWidth="2" />
        <path d="M376 160 C 360 150, 352 136, 356 120 M628 160 C 644 150, 652 136, 648 120 M420 128 C 426 112, 440 104, 456 102" strokeWidth="2.2" />
      </g>
      <Tomato x={232} y={260} />
      <BasilSprig x={706} y={392} rotate={18} scale={1.05} />
      <BasilSprig x={196} y={868} rotate={-30} scale={0.95} />
      <OliveBranch x={610} y={846} rotate={-12} scale={1} />
      <Slice x={716} y={704} rotate={-38} />
      <Sparkles points={[[300, 150], [330, 182], [690, 160], [720, 214], [150, 420], [176, 470], [860, 520], [828, 600], [380, 880], [430, 846], [880, 300], [128, 620]]} />
      {/* logo + PIZZA */}
      <image href="/logo/logo-01.svg" x="270" y="330" width="460" height="199" />
      <text x="500" y="606" textAnchor="middle" fill={GOLD_DEEP} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600, fontSize: 86, letterSpacing: 26 }}>
        PIZZA
      </text>
      <path d="M402 632 L 598 632" stroke={GOLD} strokeWidth="2" />
      {/* stamp */}
      <rect x="312" y="666" width="376" height="74" rx="12" fill="none" stroke={GOLD_DEEP} strokeWidth="4" />
      <text
        x="500"
        y="716"
        textAnchor="middle"
        fill={GOLD_DEEP}
        // long labels (Italian) are squeezed to fit the stamp
        {...(startLabel.length > 16 ? { textLength: 340, lengthAdjust: 'spacingAndGlyphs' } : {})}
        style={{ fontFamily: 'var(--font-source-serif), Georgia, serif', fontWeight: 700, fontSize: 34, letterSpacing: startLabel.length > 16 ? 1 : 4 }}
      >
        {startLabel}
      </text>
      <text x="500" y="790" textAnchor="middle" fill={GOLD} style={{ fontFamily: 'var(--font-source-serif), Georgia, serif', fontWeight: 600, fontSize: 20, letterSpacing: 6 }}>
        {ovenLabel}
      </text>
      <path d="M420 806 C 470 816, 530 816, 580 806" stroke={GOLD} strokeWidth="2" fill="none" />
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Kitchen timer: red body, cream dial, the needle turns with the remaining time
// ---------------------------------------------------------------------------------------------
/** Rounded coordinate: the same number on the server and in the browser (no hydration mismatch). */
const r2 = (value: number) => Math.round(value * 100) / 100;

export function OvenTimer({ progress }: { progress: number }) {
  const angle = -360 * (1 - progress);
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="timer-red" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#e2484f" />
          <stop offset="0.6" stopColor="#b3141f" />
          <stop offset="1" stopColor="#7a0b12" />
        </radialGradient>
        <radialGradient id="timer-dial" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#e9e1cf" />
        </radialGradient>
        <filter id="timer-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="7" stdDeviation="5" floodColor="#1a1208" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#timer-shadow)">
        <circle cx="100" cy="100" r="92" fill="url(#timer-red)" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="url(#timer-dial)" stroke="#5c0a10" strokeOpacity="0.4" strokeWidth="2" />
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const long = i % 5 === 0;
          return (
            <line
              key={i}
              x1={r2(100 + Math.sin(a) * 64)}
              y1={r2(100 - Math.cos(a) * 64)}
              x2={r2(100 + Math.sin(a) * (long ? 54 : 59))}
              y2={r2(100 - Math.cos(a) * (long ? 54 : 59))}
              stroke="#2b2622"
              strokeWidth={long ? 2.2 : 1}
            />
          );
        })}
        {[0, 10, 20, 30, 40, 50].map((m, i) => {
          const a = (m / 60) * Math.PI * 2;
          return (
            <text key={m} x={r2(100 + Math.sin(a) * 43)} y={r2(104 - Math.cos(a) * 43)} textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="#2b2622">
              {i === 0 ? 60 : m}
            </text>
          );
        })}
        <g transform={`rotate(${angle} 100 100)`} style={{ transition: 'transform 0.25s linear' }}>
          <path d="M100 100 L 96 92 L 100 40 L 104 92 Z" fill="#b3141f" />
        </g>
        <circle cx="100" cy="100" r="10" fill="#1d1a17" />
        <circle cx="97" cy="97" r="3" fill="#ffffff" opacity="0.35" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Receipt barcode (decorative, from the order reference)
// ---------------------------------------------------------------------------------------------
export function Barcode({ seed }: { seed: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < 46; i++) {
    const code = seed.charCodeAt(i % Math.max(seed.length, 1)) || 7;
    const w = ((code * (i + 3)) % 3) + 1;
    if ((code + i) % 4 !== 0) bars.push({ x, w });
    x += w + 1.2;
  }
  return (
    <svg viewBox={`0 0 ${x} 24`} width="100%" height="26" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="24" fill="#1a1816" />
      ))}
    </svg>
  );
}
