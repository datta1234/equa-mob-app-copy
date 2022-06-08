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
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={7} y={7} width={50} height={50} rx={25} fill="#19868C" />
      <Path
        d="M30.834 39h2.333v-2.333h-2.333v2.334zm1.167-18.666c-6.44 0-11.667 5.227-11.667 11.667 0 6.44 5.227 11.666 11.667 11.666 6.44 0 11.666-5.226 11.666-11.666s-5.226-11.667-11.666-11.667zm0 21c-5.145 0-9.334-4.188-9.334-9.333 0-5.145 4.189-9.334 9.334-9.334s9.333 4.189 9.333 9.334-4.188 9.333-9.333 9.333zm0-16.333a4.665 4.665 0 00-4.667 4.666h2.333a2.34 2.34 0 012.334-2.333 2.34 2.34 0 012.333 2.333c0 2.334-3.5 2.042-3.5 5.834h2.333c0-2.625 3.5-2.917 3.5-5.834a4.665 4.665 0 00-4.666-4.666z"
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
