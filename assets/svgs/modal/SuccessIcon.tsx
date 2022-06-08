import * as React from 'react';
import Svg, {
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={64}
      height={64}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={7} y={7} width={50} height={50} rx={25} fill="#19868C" />
      <Path
        d="M28.25 37.213l-5.213-5.212-1.775 1.762 6.987 6.988 15-15-1.762-1.763-13.238 13.225z"
        fill="#C6E8E9"
      />
      <Rect
        x={1}
        y={1}
        width={62}
        height={62}
        rx={31}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0.683}
          y1={6.473}
          x2={104.649}
          y2={87.254}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#91FFEA" />
          <Stop offset={1} stopColor="#A6ED46" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
