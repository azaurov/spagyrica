import React from 'react';
import Svg, { Circle, Defs, ClipPath, Rect, Ellipse, G } from 'react-native-svg';

interface Props {
  phase: number; // 0–1
  size?: number;
}

export default function MoonSVG({ phase, size = 160 }: Props) {
  const r = size / 2;
  const cx = r;
  const cy = r;

  // phase 0 = new (dark), 0.5 = full (bright)
  // 0..0.5: waxing — right side illuminated
  // 0.5..1: waning — left side illuminated
  const isWaxing = phase <= 0.5;

  // Compute the x-radius of the terminator ellipse
  // At phase=0: terminatorRx = r (full dark), phase=0.5: terminatorRx = 0 (full bright)
  const normalised = isWaxing ? phase * 2 : (phase - 0.5) * 2; // 0..1 within each half
  const terminatorRx = r * Math.abs(1 - normalised * 2); // r..0..r

  const diskColor = '#1a1a2e';
  const glowColor = '#f5e6a3';
  const terminatorFlatSide = isWaxing ? 'right' : 'left';

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <ClipPath id="moonClip">
          <Circle cx={cx} cy={cy} r={r} />
        </ClipPath>
      </Defs>

      {/* Dark disk base */}
      <Circle cx={cx} cy={cy} r={r} fill={diskColor} />

      {/* Illuminated half */}
      <G clipPath="url(#moonClip)">
        {/* Full lit hemisphere */}
        <Rect
          x={isWaxing ? cx : 0}
          y={0}
          width={r}
          height={size}
          fill={glowColor}
        />
        {/* Terminator ellipse covers/reveals */}
        <Ellipse
          cx={cx}
          cy={cy}
          rx={terminatorRx === 0 ? 0.01 : terminatorRx}
          ry={r}
          fill={isWaxing ? diskColor : glowColor}
        />
      </G>

      {/* Subtle rim */}
      <Circle cx={cx} cy={cy} r={r - 1} fill="none" stroke="rgba(245,230,163,0.15)" strokeWidth={2} />
    </Svg>
  );
}
