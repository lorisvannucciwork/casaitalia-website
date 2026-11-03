import React from 'react';

/* Drawn parts of the pizza builder: the gloved hand (cursor) and the kitchen timer. */

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
