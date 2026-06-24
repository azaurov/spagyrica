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

    case 'calendula':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.5} {...stroke} />
          <Circle cx={s/2} cy={s*0.38} r={s*0.1} fill={color} />
          {[0,24,48,72,96,120,144,168,192,216,240,264,288,312,336].map((deg, i) => {
            const rad = deg * Math.PI / 180;
            const px = s/2 + Math.cos(rad) * s*0.2;
            const py = s*0.38 + Math.sin(rad) * s*0.2;
            const ex = s/2 + Math.cos(rad) * s*0.32;
            const ey = s*0.38 + Math.sin(rad) * s*0.32;
            return <Ellipse key={i} cx={(px+ex)/2} cy={(py+ey)/2} rx={s*0.05} ry={s*0.018}
              transform={`rotate(${deg}, ${(px+ex)/2}, ${(py+ey)/2})`} fill={color} opacity={0.85} />;
          })}
          <Path d={`M${s/2} ${s*0.72} Q${s*0.38} ${s*0.62} ${s*0.35} ${s*0.56}`} {...stroke} />
          <Path d={`M${s/2} ${s*0.72} Q${s*0.62} ${s*0.62} ${s*0.65} ${s*0.56}`} {...stroke} />
        </Svg>
      );

    case 'rosemary':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.15} {...stroke} />
          {[0.2,0.3,0.4,0.5,0.6,0.7].map((yFrac, i) => (
            <G key={i}>
              <Line x1={s/2} y1={s*yFrac} x2={s/2 + (i%2===0 ? 1:-1)*s*0.18} y2={s*(yFrac-0.04)} {...stroke} strokeWidth={1.2} />
              <Line x1={s/2} y1={s*yFrac} x2={s/2 - (i%2===0 ? 1:-1)*s*0.18} y2={s*(yFrac-0.04)} {...stroke} strokeWidth={1.2} />
            </G>
          ))}
        </Svg>
      );

    case 'lemonbalm':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.2} {...stroke} />
          {[0.3,0.48,0.65].map((yFrac, i) => (
            <G key={i}>
              <Path d={`M${s/2} ${s*yFrac} Q${s*0.65} ${s*(yFrac-0.06)} ${s*0.6} ${s*(yFrac+0.08)}`} {...stroke} />
              <Path d={`M${s/2} ${s*yFrac} Q${s*0.35} ${s*(yFrac-0.06)} ${s*0.4} ${s*(yFrac+0.08)}`} {...stroke} />
            </G>
          ))}
          {[0.2,0.22,0.24].map((yFrac, i) => (
            <Circle key={i} cx={s/2 + (i-1)*s*0.04} cy={s*yFrac} r={s*0.025} fill={color} opacity={0.8} />
          ))}
        </Svg>
      );

    case 'ginger':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Path d={`M${s*0.25} ${s*0.65} Q${s*0.35} ${s*0.58} ${s*0.5} ${s*0.6} Q${s*0.65} ${s*0.62} ${s*0.75} ${s*0.55}`}
            stroke={color} strokeWidth={8} fill="none" strokeLinecap="round" />
          <Path d={`M${s*0.5} ${s*0.6} Q${s*0.48} ${s*0.45} ${s*0.42} ${s*0.35}`} {...stroke} />
          <Path d={`M${s*0.5} ${s*0.6} Q${s*0.55} ${s*0.42} ${s*0.6} ${s*0.3}`} {...stroke} />
          <Path d={`M${s*0.35} ${s*0.62} Q${s*0.32} ${s*0.72} ${s*0.28} ${s*0.78}`} {...stroke} />
          <Path d={`M${s*0.65} ${s*0.57} Q${s*0.68} ${s*0.68} ${s*0.72} ${s*0.75}`} {...stroke} />
        </Svg>
      );

    case 'wormwood':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.15} {...stroke} />
          {[0.22,0.34,0.46,0.58,0.7].map((yFrac, i) => (
            <G key={i}>
              <Path d={`M${s/2} ${s*yFrac} Q${s*0.58} ${s*(yFrac-0.04)} ${s*0.62} ${s*(yFrac-0.01)} Q${s*0.66} ${s*yFrac} ${s*0.62} ${s*(yFrac+0.03)}`} fill={color} opacity={0.6} stroke="none" />
              <Path d={`M${s/2} ${s*yFrac} Q${s*0.42} ${s*(yFrac-0.04)} ${s*0.38} ${s*(yFrac-0.01)} Q${s*0.34} ${s*yFrac} ${s*0.38} ${s*(yFrac+0.03)}`} fill={color} opacity={0.6} stroke="none" />
            </G>
          ))}
        </Svg>
      );

    case 'fennel':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.25} {...stroke} />
          {[0.35,0.5,0.65].map((yFrac, i) => (
            <G key={i}>
              {[-0.14,-0.08,0,0.08,0.14].map((dx, j) => (
                <Path key={j} d={`M${s/2} ${s*yFrac} Q${s*(0.5+dx)} ${s*(yFrac-0.06)} ${s*(0.5+dx*1.6)} ${s*(yFrac-0.1)}`}
                  {...stroke} strokeWidth={1} />
              ))}
            </G>
          ))}
          {[0,30,60,90,120,150,180,210,240,300,330].map((deg, i) => {
            const rad = deg * Math.PI / 180;
            return <Circle key={i} cx={s/2 + Math.cos(rad)*s*0.12} cy={s*0.28 + Math.sin(rad)*s*0.06}
              r={s*0.02} fill={color} opacity={0.9} />;
          })}
        </Svg>
      );

    case 'hyssop':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.15} {...stroke} />
          <Line x1={s/2} y1={s*0.65} x2={s*0.35} y2={s*0.6} {...stroke} />
          <Line x1={s/2} y1={s*0.65} x2={s*0.65} y2={s*0.6} {...stroke} />
          {[0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5].map((yFrac, i) => (
            <Ellipse key={i} cx={s/2 + (i%2===0 ? -1:1)*s*0.025} cy={s*yFrac} rx={s*0.03} ry={s*0.018} fill={color} opacity={0.85} />
          ))}
        </Svg>
      );

    case 'marshmallow':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.2} {...stroke} />
          {[0.28,0.45,0.62].map((yFrac, i) => (
            <G key={i}>
              <Ellipse cx={s*0.62} cy={s*yFrac} rx={s*0.13} ry={s*0.09} fill={color} opacity={0.65} />
              <Ellipse cx={s*0.38} cy={s*(yFrac+0.04)} rx={s*0.11} ry={s*0.08} fill={color} opacity={0.55} />
            </G>
          ))}
          <Circle cx={s/2} cy={s*0.22} r={s*0.07} fill={color} opacity={0.9} />
        </Svg>
      );

    case 'vervain':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.3} {...stroke} />
          <Line x1={s/2} y1={s*0.55} x2={s*0.32} y2={s*0.3} {...stroke} />
          <Line x1={s/2} y1={s*0.55} x2={s*0.68} y2={s*0.3} {...stroke} />
          {[[s*0.5,s*0.3],[s*0.32,s*0.3],[s*0.68,s*0.3]].map(([cx,cy], i) => (
            <G key={i}>
              {[0,1,2,3,4].map(j => (
                <Circle key={j} cx={Number(cx) + (j-2)*s*0.02} cy={Number(cy) - j*s*0.03} r={s*0.02} fill={color} opacity={0.8} />
              ))}
            </G>
          ))}
        </Svg>
      );

    case 'horsetail':
      return (
        <Svg width={s} height={s} viewBox={dim}>
          <Line x1={s/2} y1={s*0.9} x2={s/2} y2={s*0.15} {...stroke} strokeWidth={2} />
          {[0.25,0.38,0.51,0.64,0.77].map((yFrac, i) => (
            <G key={i}>
              <Line x1={s*0.32} y1={s*yFrac} x2={s*0.68} y2={s*yFrac} stroke={color} strokeWidth={1} opacity={0.5} />
              {[-0.12,-0.07,0,0.07,0.12].map((dx, j) => (
                <Line key={j} x1={s/2 + dx*s} y1={s*yFrac}
                  x2={s/2 + dx*s} y2={s*(yFrac + 0.08)} {...stroke} strokeWidth={1} />
              ))}
            </G>
          ))}
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
