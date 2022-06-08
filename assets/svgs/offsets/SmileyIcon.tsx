import * as React from 'react';

import Svg, {
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
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
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M31.989 20.334c-6.44 0-11.655 5.227-11.655 11.667 0 6.44 5.215 11.666 11.655 11.666 6.452 0 11.678-5.226 11.678-11.666S38.441 20.334 31.99 20.334zm-4.072 7c.969 0 1.75.782 1.75 1.75s-.781 1.75-1.75 1.75c-.968 0-1.75-.782-1.75-1.75s.782-1.75 1.75-1.75zm4.084 11.667c-2.66 0-4.924-1.937-5.834-4.667h11.667c-.91 2.73-3.173 4.667-5.833 4.667zm4.083-8.167c-.968 0-1.75-.782-1.75-1.75s.782-1.75 1.75-1.75 1.75.782 1.75 1.75-.782 1.75-1.75 1.75z"
          fill="#C6E8E9"
        />
      </G>
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
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(18 18)" d="M0 0h28v28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
