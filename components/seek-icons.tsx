// RavenSeek field/expedition motifs — a compass rosette in copper & verdigris.
// No "use client" — safe in server and client components.

/** Compass rosette brand mark. */
export function CompassMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke="var(--sk-copper)" strokeWidth="1.1" opacity="0.65" />
      <circle cx="24" cy="24" r="15.5" stroke="var(--sk-hairline)" strokeWidth="0.8" />
      {/* four-point star (N/S/E/W) */}
      <path d="M24 5 L27 22 L24 24 L21 22 Z" fill="var(--sk-candle)" />
      <path d="M24 43 L21 26 L24 24 L27 26 Z" fill="var(--sk-copper)" />
      <path d="M5 24 L22 21 L24 24 L22 27 Z" fill="var(--sk-verdigris)" />
      <path d="M43 24 L26 27 L24 24 L26 21 Z" fill="var(--sk-copper)" opacity="0.85" />
      <circle cx="24" cy="24" r="1.7" fill="var(--sk-candle)" />
    </svg>
  );
}

/** Large decorative compass for hero / section art. */
export function CompassLarge({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" style={style} aria-hidden="true">
      <circle cx="120" cy="120" r="112" stroke="var(--sk-copline)" strokeWidth="1" />
      <circle cx="120" cy="120" r="92" stroke="var(--sk-hairline)" strokeWidth="0.7" />
      <circle cx="120" cy="120" r="70" stroke="var(--sk-hairline)" strokeWidth="0.5" opacity="0.6" />
      {/* tick marks */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i * 360) / 48;
        const long = i % 4 === 0;
        const r1 = long ? 100 : 106;
        const rad = (a * Math.PI) / 180;
        const x1 = 120 + r1 * Math.sin(rad), y1 = 120 - r1 * Math.cos(rad);
        const x2 = 120 + 112 * Math.sin(rad), y2 = 120 - 112 * Math.cos(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={long ? "var(--sk-copper)" : "var(--sk-faint)"} strokeWidth={long ? 1 : 0.5} opacity={long ? 0.8 : 0.5} />;
      })}
      {/* star */}
      <path d="M120 22 L132 116 L120 120 L108 116 Z" fill="var(--sk-candle)" opacity="0.9" />
      <path d="M120 218 L108 124 L120 120 L132 124 Z" fill="var(--sk-copper)" />
      <path d="M22 120 L116 108 L120 120 L116 132 Z" fill="var(--sk-verdigris)" opacity="0.9" />
      <path d="M218 120 L124 132 L120 120 L124 108 Z" fill="var(--sk-copper)" opacity="0.8" />
      <circle cx="120" cy="120" r="4" fill="var(--sk-candle)" />
    </svg>
  );
}
