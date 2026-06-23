import React from 'react';
import Svg, { Path, Circle, Line, Ellipse, G } from 'react-native-svg';

interface Props {
  plantId: string;
  color: string;
  size?: number;
}

export default function PlantSVG({ plantId, color, size = 80 }: Props) {
  const s = size;
  const dim = `0 0 ${s} ${s}`;

  const stroke = { stroke: color, strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const fill = { fill: color, stroke: 'none' };

  switch (plantId) {
    case 'chamomile':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.5} {...stroke} />
          <Circle cx={s/2} cy={s*0.42} r={s*0.08} fill={color} />
          {[0,40,80,120,160,200,240,300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const px = s/2 + Math.cos(rad) * s*0.18;
            const py = s*0.42 + Math.sin(rad) * s*0.18;
            const ex = s/2 + Math.cos(rad) * s*0.28;
            const ey = s*0.42 + Math.sin(rad) * s*0.28;
            return <Ellipse key={i} cx={(px+ex)/2} cy={(py+ey)/2} rx={s*0.055} ry={s*0.02}
              transform={`rotate(${deg}, ${(px+ex)/2}, ${(py+ey)/2})`} fill={color} opacity={0.8} />;
          })}
          <Path d={`M${s/2} ${s*0.7} Q${s*0.4} ${s*0.6} ${s*0.38} ${s*0.55}`} {...stroke} />
          <Path d={`M${s/2} ${s*0.7} Q${s*0.6} ${s*0.6} ${s*0.62} ${s*0.55}`} {...stroke} />
        </Svg>
      );

    case 'mugwort':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.15} {...stroke} />
          {[-0.25,-0.15,0,0.15,0.25].map((offset, i) => {
            const y = s*(0.75 - i*0.13);
            return (
              <G key={i}>
                <Path d={`M${s/2} ${y} Q${s/2+offset*s} ${y-s*0.08} ${s/2+offset*s+s*0.12} ${y-s*0.02}`} {...stroke} />
                <Path d={`M${s/2} ${y} Q${s/2-offset*s} ${y-s*0.08} ${s/2-offset*s-s*0.12} ${y-s*0.02}`} {...stroke} />
              </G>
            );
          })}
        </Svg>
      );

    case 'nettle':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.1} {...stroke} />
          {[0.3,0.5,0.68].map((yFrac, i) => (
            <G key={i}>
              <Path d={`M${s/2} ${s*yFrac} Q${s*0.65} ${s*(yFrac-0.06)} ${s*0.72} ${s*(yFrac+0.04)}`} {...stroke} />
              <Path d={`M${s/2} ${s*yFrac} Q${s*0.35} ${s*(yFrac-0.06)} ${s*0.28} ${s*(yFrac+0.04)}`} {...stroke} />
              <Path d={`M${s*0.72} ${s*(yFrac+0.04)} L${s*0.68} ${s*(yFrac+0.01)} L${s*0.65} ${s*(yFrac+0.05)}`} {...stroke} />
              <Path d={`M${s*0.28} ${s*(yFrac+0.04)} L${s*0.32} ${s*(yFrac+0.01)} L${s*0.35} ${s*(yFrac+0.05)}`} {...stroke} />
            </G>
          ))}
        </Svg>
      );

    case 'lavender':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.3} {...stroke} />
          <Line x1={s/2} y1={s*0.55} x2={s*0.35} y2={s*0.5} {...stroke} />
          <Line x1={s/2} y1={s*0.55} x2={s*0.65} y2={s*0.5} {...stroke} />
          {[0,1,2,3,4,5,6,7].map(i => {
            const yy = s*0.3 + i * s*0.025;
            return (
              <G key={i}>
                <Ellipse cx={s/2 - s*0.025} cy={yy} rx={s*0.025} ry={s*0.015} fill={color} opacity={0.85} />
                <Ellipse cx={s/2 + s*0.025} cy={yy + s*0.012} rx={s*0.025} ry={s*0.015} fill={color} opacity={0.85} />
              </G>
            );
          })}
        </Svg>
      );

    case 'sage':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.35} {...stroke} />
          {[[s*0.5,s*0.35,s*0.16],[s*0.38,s*0.55,s*0.13],[s*0.62,s*0.5,s*0.13],[s*0.42,s*0.72,s*0.1],[s*0.58,s*0.68,s*0.1]].map(([cx,cy,rx],i) => (
            <Ellipse key={i} cx={cx} cy={cy} rx={rx} ry={rx*0.55} fill={color} opacity={0.75} />
          ))}
        </Svg>
      );

    case 'rose':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.45} {...stroke} />
          <Path d={`M${s*0.38} ${s*0.75} Q${s*0.3} ${s*0.6} ${s*0.42} ${s*0.58}`} {...stroke} />
          <Path d={`M${s*0.62} ${s*0.72} Q${s*0.7} ${s*0.58} ${s*0.58} ${s*0.56}`} {...stroke} />
          <Circle cx={s/2} cy={s*0.32} r={s*0.05} fill={color} />
          {[0,72,144,216,288].map((deg, i) => {
            const rad = deg * Math.PI / 180;
            const px = s/2 + Math.cos(rad)*s*0.1;
            const py = s*0.32 + Math.sin(rad)*s*0.1;
            return <Ellipse key={i} cx={px} cy={py} rx={s*0.07} ry={s*0.04}
              transform={`rotate(${deg+90}, ${px}, ${py})`} fill={color} opacity={0.8} />;
          })}
          {[36,108,180,252,324].map((deg, i) => {
            const rad = deg * Math.PI / 180;
            const px = s/2 + Math.cos(rad)*s*0.17;
            const py = s*0.32 + Math.sin(rad)*s*0.17;
            return <Ellipse key={i} cx={px} cy={py} rx={s*0.08} ry={s*0.045}
              transform={`rotate(${deg+90}, ${px}, ${py})`} fill={color} opacity={0.6} />;
          })}
        </Svg>
      );

    case 'comfrey':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.25} {...stroke} />
          {[[s*0.52,s*0.27,'down'],[s*0.4,s*0.38,'left'],[s*0.62,s*0.42,'right']].map(([cx,cy,dir],i) => {
            const offX = dir === 'left' ? -s*0.12 : dir === 'right' ? s*0.12 : 0;
            const offY = s*0.1;
            return <Path key={i} d={`M${cx} ${cy} Q${Number(cx)+offX} ${Number(cy)+offY/2} ${Number(cx)+offX*0.8} ${Number(cy)+offY}`}
              {...stroke} strokeWidth={2} />;
          })}
          {[0,1,2].map(i => {
            const yy = s*0.27 + i*s*0.06;
            return <Ellipse key={i} cx={s/2 + (i%2===0 ? -1:1)*s*0.04} cy={yy} rx={s*0.06} ry={s*0.03} fill={color} opacity={0.7} />;
          })}
        </Svg>
      );

    default:
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.2} {...stroke} />
          <Circle cx={s/2} cy={s*0.2} r={s*0.15} {...stroke} />
          <Line x1={s/2} y1={s*0.6} x2={s*0.3} y2={s*0.5} {...stroke} />
          <Line x1={s/2} y1={s*0.6} x2={s*0.7} y2={s*0.5} {...stroke} />
        </Svg>
      );
  }
}
